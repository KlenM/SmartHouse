import gc
import urequests

from logs import logs_info
from settings import SMARTHOUSE_ENDPOINT, SMARTHOUSE_TOCKEN


def api_send(measures):
    gc.collect()
    print(measures)
    response = urequests.post(
        SMARTHOUSE_ENDPOINT, 
        json=measures, 
        headers={
            "Tocken-Smarthouse": SMARTHOUSE_TOCKEN
        }).json()
    
    if response.get("status") == "error":
        logs_info(response)