from django.contrib.auth import login
from rest_framework import viewsets
from django.contrib.auth.views import LoginView
from django.http import HttpResponse
from .models import User
from .serializers import UserSerializer
from rest_framework.decorators import permission_classes, api_view


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
        User.objects.create(username = username, image = image)
        return HttpResponse({'message': 'User created'}, status=201)


class UserLogin(LoginView):
    def post(self, request, *args, **kwargs):
        username = request.data['username']
        picture = request.data['image']
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return HttpResponse({'message': 'Invalid username'}, status=400)

        return HttpResponse({'message': 'Successful login'}, status=200)

@api_view(["POST"])
@permission_classes([])
def login_view(request):
    username = request.data['username']
    picture = request.data['image']
    try:
        user = User.objects.get(username=username)
        login(request, user)
    except User.DoesNotExist:
        return HttpResponse({'message': 'Invalid username'}, status=400)

    return HttpResponse({'message': 'Successful login'}, status=200)
