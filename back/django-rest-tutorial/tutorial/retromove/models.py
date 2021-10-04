from django.db import models


# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=20)
    image = models.ImageField(blank=True, null=True, upload_to='photos/')

    def __str__(self):
        return self.username
