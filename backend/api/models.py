from django.db import models
from django.utils import timezone


class MeasuresModel(models.Model):
    date = models.DateTimeField(default=timezone.now)
    temperature_in = models.FloatField(null=True, blank=True)
    temperature_out = models.FloatField(null=True, blank=True)
    pressure_in = models.FloatField(null=True, blank=True)
    pressure_out = models.FloatField(null=True, blank=True)
    humidity_in = models.FloatField(null=True, blank=True)
    humidity_out = models.FloatField(null=True, blank=True)
    moisture = models.FloatField(null=True, blank=True)