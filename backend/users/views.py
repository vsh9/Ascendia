from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, LoginSerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes

User = get_user_model()

@permission_classes([AllowAny])
class RegisterView(APIView):
    """User registration view"""
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {
                    "message": "User registered successfully",
                    "id": user.id,
                    "email": user.email,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    """User login view with JWT authentication"""
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"].lower()  # Normalize email
            password = serializer.validated_data["password"]

            user = User.objects.filter(email=email).first()

            if user is None or not user.check_password(password):
                return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token

            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(access_token),
                    "user": {"id": user.id, "email": user.email},
                    "expires_in": access_token.lifetime.total_seconds(),  # Token expiry time
                }
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
