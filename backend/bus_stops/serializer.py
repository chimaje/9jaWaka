from rest_framework import serializers
from .models import BusStop

class BusStopSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusStop
        fields = ['bus_stop_id', 'name', 'location']
