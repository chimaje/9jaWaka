#serializer.py
from rest_framework import serializers
from .models import BusStop, BusOption, Route

class BusStopSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusStop
        fields = ['bus_stop_id', 'name', 'location']

class BusOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusOption
        fields = ['bus_option_id', 'bus_option_name', 'fare']

class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = ['route_id', 'start_location', 'end_location', 'cost']
