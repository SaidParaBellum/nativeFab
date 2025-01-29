from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated

from accounts.permissions import IsAdminOrTrainerPermission
from .models import Exercise
from .serializers import ExerciseSerializer
from .models import ExerciseCategory
from .serializers import ExerciseCategorySerializer
from .models import ExerciseType
from .serializers import ExerciseTypeSerializer

class ExercisePagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'limit'

class ExerciseListCreateView(generics.ListCreateAPIView):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    permission_classes = [IsAuthenticated, IsAdminOrTrainerPermission]



class ExerciseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer





class ExerciseCategoryListView(generics.ListAPIView):
    queryset = ExerciseCategory.objects.all()
    serializer_class = ExerciseCategorySerializer
    pagination_class = ExercisePagination


class ExerciseCategoryListCreateView(generics.ListCreateAPIView):
    queryset = ExerciseCategory.objects.all()
    serializer_class = ExerciseCategorySerializer
    permission_classes = [IsAuthenticated, IsAdminOrTrainerPermission]


class ExerciseCategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ExerciseCategory.objects.all()
    serializer_class = ExerciseCategorySerializer


class ExerciseTypeListCreateView(generics.ListCreateAPIView):
    queryset = ExerciseType.objects.all()
    serializer_class = ExerciseTypeSerializer
    permission_classes = [IsAuthenticated, IsAdminOrTrainerPermission]


class ExerciseTypeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ExerciseType.objects.all()
    serializer_class = ExerciseTypeSerializer
