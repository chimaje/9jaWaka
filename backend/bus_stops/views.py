#views.py
from rest_framework import generics
from django.contrib.gis.geos import Point
from django.contrib.gis.db.models.functions import Distance
from .models import BusStop
from .serializer import BusStopSerializer

class NearbyBusStopList(generics.ListAPIView):
    serializer_class = BusStopSerializer

    def get_queryset(self):
        latitude = float(self.request.query_params.get('latitude'))
        longitude = float(self.request.query_params.get('longitude'))
        user_location = Point(longitude, latitude, srid=4326)
        return BusStop.objects.annotate(distance=Distance('location', user_location)).order_by('distance')[:3]
