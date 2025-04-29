from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PasswordEntryViewSet

router = DefaultRouter()
router.register(r'passwords', PasswordEntryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
