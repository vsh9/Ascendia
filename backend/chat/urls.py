from django.urls import path
from .views import MessageListView, MessageSendView

urlpatterns = [
    path('messages/', MessageListView.as_view(), name='message-list'),
    path('messages/send/', MessageSendView.as_view(), name='message-send'),
]
