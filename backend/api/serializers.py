from rest_framework import serializers
from api.models import MeasuresModel


class RoundedFloatField(serializers.FloatField):
    def to_representation(self, value):
        return round(value, 2)


class MeasuresSerializer(serializers.ModelSerializer):
    temperature_in = RoundedFloatField()
    temperature_out = RoundedFloatField()
    pressure_in = RoundedFloatField()
    pressure_out = RoundedFloatField()
    humidity_in = RoundedFloatField()
    humidity_out = RoundedFloatField()
    moisture = RoundedFloatField()
    
    class Meta:
        model = MeasuresModel
        fields = [
            "date",
            "temperature_in",
            "temperature_out",
            "pressure_in",
            "pressure_out",
            "humidity_in",
            "humidity_out",
            "moisture"
        ]
    