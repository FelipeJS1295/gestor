from django.db import models
from django.conf import settings
from cryptography.fernet import Fernet

class PasswordEntry(models.Model):
    TIPO_CHOICES = [
        ('sitio_web', 'Sitio Web'),
        ('correo', 'Correo Electrónico'),
        ('banco', 'Banco'),
        ('aplicacion', 'Aplicación'),
        ('otro', 'Otro'),
    ]

    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES, default='otro')
    nombre_sitio = models.CharField(max_length=255)
    url = models.URLField(blank=True, null=True)
    usuario = models.CharField(max_length=255)
    contraseña_encriptada = models.TextField()
    notas = models.TextField(blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombre_sitio

    def set_password(self, raw_password):
        f = Fernet(settings.FERNET_KEY)
        self.contraseña_encriptada = f.encrypt(raw_password.encode()).decode()

    def get_password(self):
        f = Fernet(settings.FERNET_KEY)
        return f.decrypt(self.contraseña_encriptada.encode()).decode()
