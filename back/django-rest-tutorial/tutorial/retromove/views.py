from rest_framework import viewsets
from django.http import HttpResponse
from .models import User
from .serializers import UserSerializer


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
