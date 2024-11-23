from rest_framework import serializers
from .models import Bus

class BusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bus
        fields = ['id', 'routeStart', 'routeEnd', 'status', 'capacity', 'passengerCount']
