from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('', include('retromove.urls')),
    path('admin/', admin.site.urls),
]
