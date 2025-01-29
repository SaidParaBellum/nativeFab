from django.db import models

# Create your models here.


from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    USER_TYPE_CHOICES = [
        ('student', 'Ученик'),
        ('trainer', 'Тренер'),
        ('admin', 'Администратор')
    ]

    user_type = models.CharField(max_length=7, choices=USER_TYPE_CHOICES)
    bio = models.TextField(blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)

    specialization = models.CharField(max_length=255, blank=True, null=True)
    experience = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return f"{self.username} ({self.get_user_type_display()})"

    def isAdmin(self):
        return self.user_type == 'admin'

    def isTrainer(self):
        return self.user_type == 'trainer'


class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile')
    goals = models.TextField(blank=True, null=True)
    progress = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Профиль ученика: {self.user.username}"
