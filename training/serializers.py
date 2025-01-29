from django.core.exceptions import ValidationError
from rest_framework import serializers
from .models import TrainingRequest, TrainingSession
from django.contrib.auth import get_user_model

User = get_user_model()

class TrainingRequestSerializer(serializers.ModelSerializer):
    student = serializers.StringRelatedField(read_only=True)  # Показываем имя студента
    trainer = serializers.StringRelatedField(read_only=True)
    trainer_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='trainer', write_only=True)

    class Meta:
        model = TrainingRequest
        fields = [
            'id', 'student', 'trainer', 'trainer_id', 'date_requested',
            'time_requested', 'note', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']

    def validate_trainer(self, value):
        if value.user_type != 'trainer':
            raise ValidationError("Выберите пользователя с ролью 'Тренер'.")
        return value

    def validate(self, data):
        trainer = data.get('trainer')
        if trainer and trainer.user_type != 'trainer':
            raise ValidationError("Trainer must have 'trainer' role.")
        return data

    def create(self, validated_data):

        student = self.context['request'].user
        validated_data['student'] = student
        validated_data['status'] = 'pending'
        return super().create(validated_data)

class TrainingSessionSerializer(serializers.ModelSerializer):
    training_request = TrainingRequestSerializer(read_only=True)
    training_request_id = serializers.PrimaryKeyRelatedField(queryset=TrainingRequest.objects.all(), source='training_request', write_only=True)

    class Meta:
        model = TrainingSession
        fields = [
            'id', 'training_request', 'training_request_id', 'start_time', 'end_time',
            'location', 'trainer_notes'
        ]


