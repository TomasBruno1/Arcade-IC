import os

from django.contrib.auth import login
from rest_framework import viewsets
from django.contrib.auth.views import LoginView
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

    def post(self, request, *args, **kwargs):
        username = request.data['username']
        image = request.data['image']
        User.objects.create(username=username, image=image)
        return HttpResponse({'message': 'User created'}, status=201)


@api_view(["POST"])
@permission_classes([])
def login_view(request):
    username = request.data['username']
    picture = request.data['image']
    try:
        user = User.objects.get(username=username)
        login(request, user)
    except User.DoesNotExist:
        return JsonResponse({'error': 'Invalid username'}, status=400)

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
        return JsonResponse({'error': 'Invalid credentials'}, status=400)

    return HttpResponse({'error': 'Invalid credentials'}, status=400)
