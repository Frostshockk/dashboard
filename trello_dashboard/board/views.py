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
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['column_id']
    ordering_fields = ['order']
    ordering = ['order']

    def _reorder_tasks(self, column_id, order, exclude_task=None):
        """
        Обновляет порядок задач в колонке.
        Все задачи после нового положения задачи сдвигаются.
        :param column_id: ID колонки, где нужно обновить порядок.
        :param order: Позиция, куда перемещается задача.
        :param exclude_task: Задача, которую нужно исключить из обработки.
        """
        tasks = Task.objects.filter(column_id=column_id).exclude(id=exclude_task.id if exclude_task else None).order_by('order')
        
        for index, task in enumerate(tasks):
            # Сдвиг задач после указанного порядка
            if index >= order:
                task.order = index + 1
            task.save()

    @action(detail=True, methods=['post'])
    def move(self, request, pk=None):
        task = self.get_object()
        column_id = request.data.get('column')  # ID новой колонки
        order = request.data.get('order')

        if not column_id:
            return Response({'error': 'column is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Перемещаем задачу в новую колонку
            task.column_id = column_id
            if order is not None:
                # Обновляем порядок задач в колонке
                self._reorder_tasks(column_id, order, exclude_task=task)
                task.order = order
            task.save()
            return Response(TaskSerializer(task).data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


    
    
