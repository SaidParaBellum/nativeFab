from django.urls import path
from .views import (
    TrainingRequestListCreateView, TrainingRequestDetailView,
    TrainingSessionListCreateView, TrainingSessionDetailView, TrainingSessionRequestView
)

urlpatterns = [
    path('training-requests/', TrainingRequestListCreateView.as_view(), name='training_create'),
    path('training-requests/<int:pk>/', TrainingRequestDetailView.as_view(), name='training_detail'),

    path('training_sessions_filter/', TrainingSessionRequestView.as_view(), name='session_filter'),

    path('training-sessions/', TrainingSessionListCreateView.as_view(), name='session_create'),
    path('training-sessions/<int:pk>/', TrainingSessionDetailView.as_view(), name='session_detail'),
]
