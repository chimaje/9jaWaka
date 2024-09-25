#urls.py
from django.contrib import admin
from django.urls import path
from bus_stops.views import NearbyBusStopList
from bus_stops.routeview import calculate_route

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/nearby-bus-stops/', NearbyBusStopList.as_view(), name='nearby-bus-stops'),
    path('api/calculate-route/', calculate_route.as_view(), name='calculate-route'),  # Typo here: 'claculate-route' instead of 'calculate-route'
]

