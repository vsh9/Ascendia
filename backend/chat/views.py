from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Message
from .serializers import MessageSerializer
from django.contrib.auth.models import User

class MessageListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        other_user_id = request.query_params.get('with_user')
        if not other_user_id:
            return Response({'error': 'with_user query param is required'}, status=400)
        
        messages = Message.objects.filter(
            sender_id=request.user.id, receiver_id=other_user_id
        ) | Message.objects.filter(
            sender_id=other_user_id, receiver_id=request.user.id
        )

        messages = messages.order_by('timestamp')
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)


class MessageSendView(generics.CreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)
