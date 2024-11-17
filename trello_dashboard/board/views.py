from django.shortcuts import render

from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action


from rest_framework import status
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

from .models import Column, Task
from .serializers import ColumnSerializer, TaskSerializer

# Create your views here.

class ColumnViewSet(ModelViewSet):
    queryset = Column.objects.all()
    serializer_class = ColumnSerializer

    @action(detail=True, methods=['get'])
    def tasks(self, request, pk=None):
        """Получить задачи внутри колонки с сортировкой."""
        column = self.get_object()
        tasks = column.tasks.all().order_by('order', 'created_at')
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
        


class TaskViewSet(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    @action(detail=True, methods=['post'])
    def move(self, request, pk=None):
        task = self.get_object()
        column_id = request.data.get('column_id')
        order = request.data.get('order')

        if not column_id or not order:
            return Response({'error': 'Both column_id and order are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            task.column_id = column_id
            task.order = order
            task.save()

            # Возвращаем обновленную задачу
            return Response(TaskSerializer(task).data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


    
    
