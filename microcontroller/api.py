import gc
import urequests

from logs import logs_info
from settings import SMARTHOUSE_ENDPOINT, SMARTHOUSE_TOCKEN


def api_send(measures):
    print(measures)
    gc.collect()
    try:
        response = urequests.post(
            SMARTHOUSE_ENDPOINT, 
            json=measures, 
            headers={
                "Smarthouse-Tocken": SMARTHOUSE_TOCKEN, 
                "Content-Type": "application/json"
            }).json()
    except e:
        logs_error(str(e))
    
    if response.get("status") == "error":
        logs_error(response)