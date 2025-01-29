from django.core.exceptions import ValidationError
from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated

from accounts.permissions import IsTrainerPermission
from .models import TrainingRequest
from .serializers import TrainingRequestSerializer
from .models import TrainingSession
from .serializers import TrainingSessionSerializer

class TrainingRequestPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'limit'

class TrainingRequestListCreateView(generics.ListCreateAPIView):
    queryset = TrainingRequest.objects.all()
    serializer_class = TrainingRequestSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = TrainingRequestPagination

    def perform_create(self, serializer):
        if self.request.user.user_type != 'student':
            raise ValidationError("Только ученик может создавать запросы на тренировки.")

        trainer = serializer.validated_data.get('trainer')
        if trainer and trainer.user_type != 'trainer':
            raise ValidationError("Запрос можно создать только к тренеру.")

        serializer.save(student=self.request.user)


class TrainingRequestDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TrainingRequest.objects.all()
    serializer_class = TrainingRequestSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        training_request = self.get_object()

        if self.request.user != training_request.trainer:
            raise ValidationError("Вы не можете изменять запросы, адресованные другому тренеру.")

        serializer.save()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        if 'status' in request.data and instance.trainer != request.user:
            raise ValidationError("Только тренер может изменять статус запроса.")

        return super().update(request, *args, **kwargs)



class TrainingSessionListCreateView(generics.ListCreateAPIView):
    serializer_class = TrainingSessionSerializer
    permission_classes = [IsAuthenticated, IsTrainerPermission]

    def get_queryset(self):
        return TrainingRequest.objects.filter(trainer=self.request.user)

    def perform_create(self, serializer):

        serializer.save(trainer=self.request.user)

class TrainingSessionRequestView(generics.ListAPIView):
    serializer_class = TrainingRequestSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return TrainingRequest.objects.filter(trainer=self.request.user)




class TrainingSessionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TrainingSession.objects.all()
    serializer_class = TrainingSessionSerializer
