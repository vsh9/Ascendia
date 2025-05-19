import sys
import os

# Add the parent folder of 'jobml' to sys.path so we can import it
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))               
PROJECT_ROOT = os.path.abspath(os.path.join(CURRENT_DIR, '../..'))  
sys.path.append(PROJECT_ROOT)

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.filters import OrderingFilter
from rest_framework import filters
from .models import Job
from .serializers import JobSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ResumeSerializer
from jobml.resume_parser import extract_text_from_pdf
from jobml.recommender import extract_skills, recommend_jobs


class JobListCreateAPIView(generics.ListCreateAPIView):
    queryset = Job.objects.all().order_by('-date_posted')
    serializer_class = JobSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, OrderingFilter]
    filterset_fields = ['location', 'job_type', 'is_remote']
    search_fields = ['title', 'company', 'description']
    ordering_fields = ['salary_min', 'salary_max', 'experience_required']

class JobRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

class JobListAPIView(generics.ListAPIView):
    serializer_class = JobSerializer

    def get_queryset(self):
        queryset = Job.objects.all()
        location = self.request.query_params.get('location')
        job_type = self.request.query_params.get('job_type')  
        salary_min = self.request.query_params.get('salary_min__gte')
        salary_max = self.request.query_params.get('salary_max__lte')
        search = self.request.query_params.get('search')

        if location:
            queryset = queryset.filter(location__icontains=location)

        if job_type:
            queryset = queryset.filter(job_type=job_type) 

        if salary_min:
            queryset = queryset.filter(salary_min__gte=salary_min)

        if salary_max:
            queryset = queryset.filter(salary_max__lte=salary_max)

        if search:
            queryset = queryset.filter(title__icontains=search)

        return queryset

class JobDestroyAPIView(generics.DestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    
class ResumeUploadView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ResumeSerializer(data=request.data)
        if serializer.is_valid():
            resume = serializer.save()
            file_path = resume.file.path

            try:
                # 1. Extract text from PDF
                text = extract_text_from_pdf(file_path)

                # 2. Extract skills from the text
                skills = extract_skills(text)

                # 3. Get job recommendations
                recommendations = recommend_jobs(skills)

                return Response({
                    "message": "Resume uploaded successfully",
                    "skills": skills,
                    "recommendations": [
                        {
                            "job_title": rec[0],
                            "score": rec[1],
                            "matched_skills": list(rec[2])
                        } for rec in recommendations
                    ]
                }, status=status.HTTP_201_CREATED)

            except Exception as e:
                print("ML Error:", str(e))
                return Response({
                    "message": "Resume uploaded, but ML failed",
                    "error": str(e)
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)