from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from .models import Job
from .serializers import JobSerializer
from rest_framework.filters import OrderingFilter
from rest_framework import filters

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