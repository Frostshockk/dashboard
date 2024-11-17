from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Column, Task
from .serializers import ColumnSerializer, TaskSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from .models import Task
from .serializers import TaskSerializer

# Create your views here.
from rest_framework.decorators import action

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
        new_column_id = request.data.get('column_id')
        new_order = request.data.get('order', None)

        if not new_column_id:
            return Response({'error': 'column_id is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            task.column_id = new_column_id
            if new_order is not None:
                task.order = new_order
            task.save()

            self._reorder_tasks(task.column_id)
            return Response(TaskSerializer(task).data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)