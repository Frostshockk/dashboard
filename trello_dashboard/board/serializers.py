from rest_framework import serializers
from .models import Column, Task

class ColumnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Column
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    column = serializers.PrimaryKeyRelatedField(queryset=Column.objects.all())

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'column', 'order']
