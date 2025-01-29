from rest_framework import generics, permissions
from django.shortcuts import get_object_or_404
from .models import Chat, Message
from .serializers import ChatSerializer, MessageSerializer

class ChatListCreateView(generics.ListCreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Chat.objects.filter(student=user) | Chat.objects.filter(trainer=user)

class MessageListCreateView(generics.ListCreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        chat_id = self.request.data.get('chat')
        chat = get_object_or_404(Chat, id=chat_id)
        serializer.save(chat=chat, sender=self.request.user)
