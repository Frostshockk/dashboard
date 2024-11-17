from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Column, Task
from .serializers import ColumnSerializer, TaskSerializer


# Create your views here.
class ColumnViewSet(ModelViewSet):
    queryset = Column.objects.all()
    serializer_class = ColumnSerializer

class TaskViewSet(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
