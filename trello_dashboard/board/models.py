from django.db import models

# Create your models here.
class Column(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title

    
class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    column = models.ForeignKey('Column', on_delete=models.CASCADE, related_name='tasks')
    order = models.IntegerField(default=0)

    class Meta:
        unique_together = ('column', 'order')

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.order is None:
            # Устанавливаем order как максимальный + 1 для новых задач
            max_order = Task.objects.filter(column=self.column).aggregate(models.Max('order'))['order__max']
            self.order = max_order + 1 if max_order is not None else 0
        super().save(*args, **kwargs)

