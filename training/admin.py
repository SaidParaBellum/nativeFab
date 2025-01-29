from django.contrib import admin

from training.models import TrainingRequest, TrainingSession

# Register your models here.

admin.site.register(TrainingRequest)
admin.site.register(TrainingSession)