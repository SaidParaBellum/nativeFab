from rest_framework import serializers
from .models import Exercise, ExerciseCategory, ExerciseType


class ExerciseSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    exercise_type = serializers.StringRelatedField()

    class Meta:
        model = Exercise
        fields = [
            'id', 'name', 'description', 'photo', 'video', 'category',
            'exercise_type', 'difficulty_level', 'calories_burned', 'has_video'
        ]
        read_only_fields = ['has_video']


class ExerciseCategorySerializer(serializers.ModelSerializer):
    exercises = ExerciseSerializer(many=True, read_only=True)

    class Meta:
        model = ExerciseCategory
        fields = ['id', 'name', 'description', 'photo', 'exercises']


class ExerciseTypeSerializer(serializers.ModelSerializer):
    exercises = ExerciseSerializer(many=True, read_only=True)

    class Meta:
        model = ExerciseType
        fields = ['id', 'name', 'photo', 'exercises']
