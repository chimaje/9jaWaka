import requests
from django.contrib.gis.geos import Point
from django.contrib.gis.db.models.functions import Distance
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import BusStop
from .serializer import BusStopSerializer

class calculate_route(APIView):
    @staticmethod
    def get(request):
        latitude = float(request.query_params.get('latitude'))
        longitude = float(request.query_params.get('longitude'))
        destination_latitude = float(request.query_params.get('destination_latitude'))
        destination_longitude = float(request.query_params.get('destination_longitude'))

        # Call external API to calculate route
        route_api_url = f"https://router.project-osrm.org/route/v1/driving/{longitude},{latitude};{destination_longitude},{destination_latitude}?overview=full&geometries=geojson&steps=true"
        route_response = requests.get(route_api_url).json()

        # Logging for debugging
        # print("Route API Response:", route_response)

        if 'routes' in route_response:
            steps = route_response['routes'][0]['legs'][0]['steps']
            bus_stops = BusStop.objects.all()
            necessary_bus_stops = []

            for step in steps:
                step_point = Point(step['geometry']['coordinates'][0], step['geometry']['coordinates'][1], srid=4326)
                nearby_stops = bus_stops.annotate(distance=Distance('location', step_point)).order_by('distance')[:3]
                for stop in nearby_stops:
                    if stop not in necessary_bus_stops:
                        necessary_bus_stops.append(stop)

            serializer = BusStopSerializer(necessary_bus_stops, many=True)
            return Response({
                'route': route_response['routes'][0],
                'bus_stops': serializer.data
            })

        return Response({'error': 'Route calculation failed'}, status=status.HTTP_400_BAD_REQUEST)
