from django.contrib import admin
from board.models import Column, Task

# Register your models here.

class ColumnAdmin(admin.ModelAdmin):
    pass
class TaskAdmin(admin.ModelAdmin):
    pass

admin.site.register(Column,ColumnAdmin)
admin.site.register(Task,TaskAdmin)