import datetime
from django.http import JsonResponse
from django.db.models import Avg
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer

from backend.settings import SMARTHOUSE_TOCKEN
from api.serializers import MeasuresSerializer
from api.models import MeasuresModel

@api_view(["GET", "POST"])
def measures(request):
    if request.method == "POST":
        if request.headers.get("Smarthouse-Tocken", None) != SMARTHOUSE_TOCKEN:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        measure = MeasuresSerializer(data={
            "temperature_in": request.data.get("temperature", None),
            "pressure_in": request.data.get("pressure", None),
            "humidity_in": request.data.get("humidity", None),
            "moisture": request.data.get("moisture", None)
        })
        if measure.is_valid():
            measure.save()
            return Response(measure.data, status=status.HTTP_201_CREATED)
        return Response(measure.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        period = request.query_params.get("period", "1h")
        try:
            period_hours = int(period[:-1])
            if period[-1] != "h" or 7 * 24 < period_hours or period_hours <= 0:
                raise ValueError()
        except ValueError:
            return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        
        period_start = datetime.datetime.now() - datetime.timedelta(hours=period_hours)
        period_measures = MeasuresModel.objects.filter(date__gte=period_start)
        return Response(MeasuresSerializer(period_measures, many=True).data)

@api_view(["GET"])
def now(request):
    last_measure = MeasuresModel.objects.last()
    return Response(MeasuresSerializer(last_measure).data)

@api_view(["GET"])
def today(request):
    today_start = datetime.datetime.combine(datetime.date.today(), datetime.time(8, 0))
    today_measure = MeasuresModel.objects.filter(date__gte=today_start).aggregate(
        temperature_in=Avg("temperature_in"), 
        temperature_out=Avg("temperature_out"), 
        pressure_in=Avg("pressure_in"), 
        pressure_out=Avg("pressure_out"), 
        humidity_in=Avg("humidity_in"), 
        humidity_out=Avg("humidity_out"), 
        moisture=Avg("moisture")
        )
    return Response(MeasuresSerializer(today_measure).data)
