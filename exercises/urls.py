from django.urls import path
from .views import (
    ExerciseListCreateView, ExerciseDetailView,
    ExerciseCategoryListCreateView, ExerciseCategoryDetailView,
    ExerciseTypeListCreateView, ExerciseTypeDetailView
)

urlpatterns = [

    path('exercises/', ExerciseListCreateView.as_view(), name='exercise_create'),
    path('exercises/<int:pk>/', ExerciseDetailView.as_view(), name='exercise_detail'),


    path('categories/', ExerciseCategoryListCreateView.as_view(), name='category_create'),
    path('categories/<int:pk>/', ExerciseCategoryDetailView.as_view(), name='category_detail'),


    path('types/', ExerciseTypeListCreateView.as_view(), name='type_create'),
    path('types/<int:pk>/', ExerciseTypeDetailView.as_view(), name='type_detail'),
]
