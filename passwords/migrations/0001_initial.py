# Generated by Django 5.2 on 2025-04-29 00:10

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PasswordEntry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_sitio', models.CharField(max_length=255)),
                ('url', models.URLField(blank=True, null=True)),
                ('usuario', models.CharField(max_length=255)),
                ('contraseña_encriptada', models.TextField()),
                ('notas', models.TextField(blank=True, null=True)),
                ('fecha_creacion', models.DateTimeField(auto_now_add=True)),
                ('fecha_actualizacion', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
