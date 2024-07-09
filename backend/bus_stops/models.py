from django.contrib.gis.db import models

class BusStop(models.Model):
    bus_stop_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    location = models.PointField()

    class Meta:
        db_table = "bus_stop"
        managed = True

    def __str__(self):
        return self.name

class Route(models.Model):
    route_id = models.AutoField(primary_key=True)
    start_location = models.PointField()
    end_location = models.PointField()
    cost = models.CharField(max_length=50)  # Assuming cost is a range stored as a string

    class Meta:
        db_table = "route"
        managed = True

    def __str__(self):
        return f"Route {self.route_id} from {self.start_location} to {self.end_location}"

class BusOption(models.Model):
    bus_option_id = models.AutoField(primary_key=True)
    bus_option_name= models.CharField(max_length=500) 
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    fare = models.CharField(max_length=50)  # Assuming fare is a range stored as a string

    class Meta:
        db_table = "bus_option"
        managed = True

    def __str__(self):
        return f"Bus Option {self.bus_option_id} for Route {self.route.route_id}"
