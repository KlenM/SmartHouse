import network

from logs import logs_info


def wifi_connect(essid, password):
    sta_if = network.WLAN(network.STA_IF)
    if not sta_if.isconnected():
        sta_if.active(True)
        sta_if.connect(essid, password)
        while not sta_if.isconnected():
            pass
    logs_info('Connected:' + str(sta_if.ifconfig()))