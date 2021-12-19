import os

from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets
from django.contrib.auth.views import LoginView
from django.core import serializers
from django.http import HttpResponse, JsonResponse
from .models import User
from .serializers import UserSerializer
from rest_framework.decorators import permission_classes, api_view
import face_recognition


class UserViewSet(viewsets.ModelViewSet):
    """
    This ViewSet automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    user = User
    pagination_class = None

    def post(self, request, *args, **kwargs):
        username = request.data['username']
        image = request.data['image']
        User.objects.create(username=username, image=image)
        return HttpResponse({'message': 'User created'}, status=201)

    @login_required(login_url="/login")
    def put(self, request, *args, **kwargs):
        username = request.data['username']
        snake = request.POST.get('score_snake', False)
        pacman = request.POST.get('score_pacman', False)

        try: user = User.objects.get(username=username)
        except User.DoesNotExist:
            return HttpResponse({'User does not exist'}, status=400)

        if snake:
            if int(snake) > user.score_snake:
                user.score_snake = snake

        if pacman:
            if int(pacman) > user.score_pacman:
                user.score_pacman = pacman

        user.save()
        return HttpResponse({'Score updated'}, status=200)

    def list(self, request, *args, **kwargs):
        game = request.data['game']
        print(game)
        data = list(User.objects.order_by('-score_'+game).values('username', 'score_'+game))
        return JsonResponse(data, safe=False)

@api_view(["POST"])
@permission_classes([])
def login_view(request):
    username = request.data['username']
    picture = request.data['image']
    try:
        user = User.objects.get(username=username)
        login(request, user)
    except User.DoesNotExist:
        return HttpResponse({'Invalid username'}, status=400)

    try:
        image_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'media/photos/' + username + '.jpg')
        image_of_user = face_recognition.load_image_file(image_path)
        user_face_encoding = face_recognition.face_encodings(image_of_user)[0]

        image = face_recognition.load_image_file(picture)
        face_locations = face_recognition.face_locations(image)
        face_encoding = face_recognition.face_encodings(image, face_locations)

        matches = face_recognition.compare_faces(user_face_encoding, face_encoding)
        if True in matches:
            return JsonResponse({'username': user.username})
    except Exception as e:
        return HttpResponse({'Invalid credentials'}, status=400)

    return HttpResponse({'Invalid credentials'}, status=400)


@api_view(["POST"])
def logout_view(request):
    logout(request)
    return HttpResponse({'Logout successful'})
