from rest_framework import generics
from .models import Event
from .serializers import EventSerializer

class EventListCreateAPIView(generics.ListCreateAPIView):
    queryset = Event.objects.all().order_by('-start_date')
    serializer_class = EventSerializer

class EventRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
