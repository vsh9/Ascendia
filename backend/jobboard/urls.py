from django.urls import path
from .views import ResumeUploadView, JobListAPIView, JobListCreateAPIView, JobRetrieveAPIView, JobDestroyAPIView

urlpatterns = [
    path('upload-resume/', ResumeUploadView.as_view(), name='upload-resume'),
    path('create/', JobListCreateAPIView.as_view(), name='job-list-create'),
    path('<int:pk>/', JobRetrieveAPIView.as_view(), name='job-retrieve'),
    path('view/', JobListAPIView.as_view(), name='job-list'),
    path('delete/<int:pk>/', JobDestroyAPIView.as_view(), name='job-detail'),
]
