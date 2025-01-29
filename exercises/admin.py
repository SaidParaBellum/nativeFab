from django.contrib import admin

from exercises.models import ExerciseCategory, ExerciseType, Exercise

# Register your models here.

admin.site.register(ExerciseCategory)
admin.site.register(ExerciseType)
admin.site.register(Exercise)