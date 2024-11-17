from django.contrib import admin
from board.models import Column, Task

# Register your models here.

class ColumnAdmin(admin.ModelAdmin):
    list_display = ['title']

admin.site.register(Column, ColumnAdmin)

class TaskAdmin(admin.ModelAdmin):
    list_display = ['title', 'column', 'order']
    search_fields = ['title']
    list_filter = ['column']
    ordering = ['order']

admin.site.register(Task,TaskAdmin)