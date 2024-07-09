from django.contrib import admin
from .models import BusStop, Route, BusOption
from django.contrib.gis.admin import GISModelAdmin

@admin.register(BusStop)
class BusStopAdmin(GISModelAdmin):  # Use GISModelAdmin for GIS functionality
    list_display = ('name', 'location')

@admin.register(Route)
class RouteAdmin(GISModelAdmin):  # Use GISModelAdmin for GIS functionality
    list_display = ('start_location', 'end_location', 'cost')

@admin.register(BusOption)
class BusOptionAdmin(GISModelAdmin):  # Use GISModelAdmin for GIS functionality
    list_display = ('bus_option_id',"bus_option_name", 'route', 'fare')
