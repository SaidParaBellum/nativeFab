from django.db import models

# Create your models here.


from django.db import models
from django.conf import settings


class TrainingRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Ожидание'),
        ('approved', 'Принято'),
        ('rejected', 'Отклонено'),
    ]

    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='training_requests')
    trainer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='received_requests')
    date_requested = models.DateField()
    time_requested = models.TimeField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    note = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Request from {self.student} to {self.trainer} on {self.date_requested} at {self.time_requested}"


class TrainingSession(models.Model):
    training_request = models.OneToOneField(TrainingRequest, on_delete=models.CASCADE, related_name='session')
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    location = models.CharField(max_length=255)
    trainer_notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Session for {self.training_request.student} with {self.training_request.trainer} on {self.start_time}"
