from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ColumnViewSet, TaskViewSet

router = DefaultRouter()
router.register(r'columns', ColumnViewSet)
router.register(r'tasks', TaskViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
