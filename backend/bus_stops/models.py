from django.contrib.gis.db import models

class BusStop(models.Model):
    name = models.CharField(max_length=100)
    location = models.PointField()
    class Meta:
        db_table = "BusStop"
        managed = True
    def __str__(self):
        return self.name
