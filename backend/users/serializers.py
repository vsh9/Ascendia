from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

User=get_user_model()

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    def validate_email(self, value):
        """Check that the email is valid."""
        if not value or '@' not in value:
            raise serializers.ValidationError("Enter a valid email address.")
        return value

    class Meta:
        model = User
        fields = ["id","email","password"]
        extra_kwargs = {"password": {"write_only": True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data["email"], password=validated_data["password"],
            username=validated_data.get("email", "").split("@")[0])
        return user
    
class LoginSerializer(serializers.Serializer):
    email=serializers.EmailField()
    password=serializers.CharField(write_only=True)
    
    def create(self, validated_data):
        raise NotImplementedError("LoginSerializer does not support create.")

    def update(self, instance, validated_data):
        raise NotImplementedError("LoginSerializer does not support update.")
