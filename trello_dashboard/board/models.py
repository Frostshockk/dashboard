from django.db import models

# Create your models here.
class Column(models.Model):
    name = models.CharField(max_length= 100)
    order = models.PositiveIntegerField()


    def __str__(self):
        return self.name
    

class Task(models.Model):
    title = models.CharField(max_length= 200)
    description = models.TextField(blank = True, null= True)
    created_at = models.DateTimeField(auto_now_add=True)
    column = models.ForeignKey(Column, related_name='tasks', on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title