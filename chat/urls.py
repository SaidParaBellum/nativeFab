from django.urls import path
from . import views

urlpatterns = [
    path('chats/', views.ChatListCreateView.as_view(), name='chat-list-create'),
    path('messages/', views.MessageListCreateView.as_view(), name='message-list-create'),
]
