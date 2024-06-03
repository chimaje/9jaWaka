from django.contrib import admin
from .models import BusStop
from django.contrib.gis.admin import GISModelAdmin

@admin.register(BusStop)
class BusStopAdmin(GISModelAdmin):  # Use GISModelAdmin for GIS functionality
    list_display = ('name', 'location')