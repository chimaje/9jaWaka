#routeview.py
import requests
from django.contrib.gis.geos import Point, LineString
from django.contrib.gis.db.models.functions import Distance
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import BusStop, Route, BusOption
from .serializer import BusStopSerializer, BusOptionSerializer, RouteSerializer

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

            bus_stop_serializer = BusStopSerializer(necessary_bus_stops, many=True)
            
            # Identify matching routes in the database
            route_line = LineString([(longitude, latitude), (destination_longitude, destination_latitude)], srid=4326)
            matching_routes = Route.objects.filter(start_location__distance_lte=(route_line, 5000))  # Adjust distance threshold as needed
            route_serializer = RouteSerializer(matching_routes, many=True)

            # Fetch associated bus options
            bus_options = BusOption.objects.filter(route__in=matching_routes)
            bus_option_serializer = BusOptionSerializer(bus_options, many=True)

            return Response({
                'route': route_response['routes'][0],
                'bus_stops': bus_stop_serializer.data,
                'routes': route_serializer.data,
                'bus_options': bus_option_serializer.data
            })

        return Response({'error': 'Route calculation failed'}, status=status.HTTP_400_BAD_REQUEST)
