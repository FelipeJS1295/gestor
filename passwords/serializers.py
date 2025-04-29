from rest_framework import serializers
from .models import PasswordEntry

class PasswordEntrySerializer(serializers.ModelSerializer):
    contraseña = serializers.CharField(write_only=True)

    class Meta:
        model = PasswordEntry
        fields = ['id', 'tipo', 'nombre_sitio', 'url', 'usuario', 'contraseña', 'notas', 'fecha_creacion', 'fecha_actualizacion']
        read_only_fields = ['fecha_creacion', 'fecha_actualizacion']

    def create(self, validated_data):
        password = validated_data.pop('contraseña')
        entry = PasswordEntry(**validated_data)
        entry.set_password(password)
        entry.save()
        return entry

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['contraseña'] = instance.get_password()
        return ret
