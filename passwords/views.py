from rest_framework import viewsets
from .models import PasswordEntry
from .serializers import PasswordEntrySerializer

class PasswordEntryViewSet(viewsets.ModelViewSet):
    queryset = PasswordEntry.objects.all()
    serializer_class = PasswordEntrySerializer
