from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.
class User(AbstractUser):
    username = models.CharField(max_length=20, unique=True)
    image = models.ImageField(blank=True, null=True, upload_to='photos/')

    def __str__(self):
        return self.username
