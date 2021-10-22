from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, UserLogin, login_view

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'users', UserViewSet)
urlpatterns = router.urls
urlpatterns.append(path('login/', login_view, name="login"))
