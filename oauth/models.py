from django.contrib.auth.models import AbstractUser, Group
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models


class User(AbstractUser):
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    username_validator = UnicodeUsernameValidator()

    email = models.EmailField(primary_key=True,
                              max_length=64,
                              help_text='Email')
    username = models.CharField(max_length=128,
                                help_text='Username')
    picture = models.ImageField(default='',
                                blank=True,
                                upload_to='profile_images',
                                help_text='Profile picture')


class Group(Group):
    class Meta:
        proxy = True
