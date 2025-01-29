from django.db import models

# Create your models here.
from django.db import models

class Exercise(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    photo = models.ImageField(upload_to='exercise_photos/', blank=True, null=True)
    video = models.FileField(blank=True, null=True)
    category = models.ForeignKey('ExerciseCategory', on_delete=models.SET_NULL, null=True, related_name='exercises')
    exercise_type = models.ForeignKey('ExerciseType', on_delete=models.SET_NULL, null=True, related_name='exercises')
    difficulty_level = models.CharField(max_length=50, choices=[
        ('beginner', 'Новичок'),
        ('intermediate', 'Средний уровень'),
        ('advanced', 'Продвинутый'),
    ], default='beginner')
    calories_burned = models.PositiveIntegerField(blank=True, null=True)

    def __str__(self):
        return self.name

    def has_video(self):
        return bool(self.video)

class ExerciseCategory(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    photo = models.ImageField(upload_to='exercise_category_photos/', blank=True, null=True)

    class Meta:
        verbose_name = "Exercise Category"
        verbose_name_plural = "Exercise Categories"

    def __str__(self):
        return self.name

class ExerciseType(models.Model):
    name = models.CharField(max_length=255)
    photo = models.ImageField(upload_to='exercise_type_photos/', blank=True, null=True)

    class Meta:
        verbose_name = "Exercise Type"
        verbose_name_plural = "Exercise Types"

    def __str__(self):
        return self.name
