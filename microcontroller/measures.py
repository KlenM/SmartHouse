import gc
import machine
import time

from contrib import bme280
from settings import GROUND_ADC, BME_IN_SCL, BME_IN_SDA, BME_OUT_SCL, BME_OUT_SDA


class Measures:
    def __init__(self, count_for_average, sending_delta):
        self.count_for_average = count_for_average
        self.measurement_delta = sending_delta / count_for_average
        self.moisture_adc = machine.ADC(machine.Pin(GROUND_ADC))
        self.moisture_adc.atten(machine.ADC.ATTN_11DB)
        self.bme_in = bme280.BME280(i2c=machine.SoftI2C(
            scl=machine.Pin(BME_IN_SCL), 
            sda=machine.Pin(BME_IN_SDA), 
            freq=3400
        ))
        self.bme_out = bme280.BME280(i2c=machine.SoftI2C(
            scl=machine.Pin(BME_OUT_SCL), 
            sda=machine.Pin(BME_OUT_SDA), 
            freq=3400
        ))
        self.init_collectors()

    def init_collectors(self):
        self.temperature_in_collector = 0
        self.pressure_in_collector = 0
        self.humidity_in_collector = 0
        
        self.temperature_out_collector = 0
        self.pressure_out_collector = 0
        self.humidity_out_collector = 0

        self.moisture_collector = 0

    def do_measures(self):
        temperature, pressure, humidity = self.bme_in.read_compensated_data()
        self.temperature_in_collector += temperature
        self.pressure_in_collector += pressure * 0.0075
        self.humidity_in_collector += humidity

        temperature, pressure, humidity = self.bme_out.read_compensated_data()
        self.temperature_out_collector += temperature
        self.pressure_out_collector += pressure * 0.0075
        self.humidity_out_collector += humidity

        self.moisture_collector += self.moisture_adc.read() / 40.96

    def get_averaged_measures(self):
        self.init_collectors()

        for i in range(self.count_for_average):
            time.sleep(self.measurement_delta)
            self.do_measures()

        return {
            "temperature_in": float("{0:0.3f}".format(self.temperature_in_collector / self.count_for_average)),
            "pressure_in": float("{0:0.3f}".format(self.pressure_in_collector / self.count_for_average)),
            "humidity_in": float("{0:0.3f}".format(self.humidity_in_collector / self.count_for_average)),
            "temperature_out": float("{0:0.3f}".format(self.temperature_out_collector / self.count_for_average)),
            "pressure_out": float("{0:0.3f}".format(self.pressure_out_collector / self.count_for_average)),
            "humidity_out": float("{0:0.3f}".format(self.humidity_out_collector / self.count_for_average)),
            "moisture": float("{0:0.3f}".format(self.moisture_collector / self.count_for_average)),
        }