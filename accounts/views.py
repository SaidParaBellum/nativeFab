from django.contrib.auth import authenticate
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from accounts.models import User
from accounts.permissions import IsAdminPermission
from accounts.serializers import UserRegistrationSerializer, UserSerializer, UserUpdateSerializer


from rest_framework_simplejwt.tokens import RefreshToken

class RegisterAPIView(CreateAPIView):
    serializer_class = UserRegistrationSerializer
    queryset = User.objects.all()

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()


        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        response_data = {
            'user': UserSerializer(user).data,
            'refresh': str(refresh),
            'access': access_token,
        }

        return Response(response_data, status=status.HTTP_201_CREATED)






class CurrentUserAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)



class UpdateUserAPIView(generics.UpdateAPIView):
    serializer_class = UserUpdateSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user



class UserListAPIView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdminPermission]
    def get_queryset(self):
        queryset = User.objects.all()
        search_query = self.request.query_params.get('search', '')

        if search_query:
            queryset = queryset.filter(
                first_name__icontains=search_query
            ) | queryset.filter(
                last_name__icontains=search_query
            )

        return queryset

    def list(self, request: Request, *args, **kwargs):
        page = int(request.query_params.get('page', 1))
        limit = int(request.query_params.get('limit', 5))
        limit = max(limit, 5)

        start_index = (page - 1) * limit
        end_index = start_index + limit

        queryset = self.get_queryset()
        paginated_users = queryset[start_index:end_index]

        serializer = self.get_serializer(paginated_users, many=True)
        response_data = {
            'result': serializer.data,
            'count': queryset.count(),
            'page': page,
            'limit': limit
        }

        return Response(response_data)



class VerifyPasswordAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'password': openapi.Schema(type=openapi.TYPE_STRING, description='User password')
            }
        )
    )
    def post(self, request):
        password = request.data.get('password')
        if not password:
            return Response({'error': 'Требуется ввести пароль'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=request.user.username, password=password)
        if user:
            return Response({'status': 'OK'}, status=status.HTTP_200_OK)
        return Response({'error': 'Неверный пароль'}, status=status.HTTP_400_BAD_REQUEST)



class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
