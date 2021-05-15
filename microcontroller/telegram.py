import gc
from contrib import urequests
from settings import TG_ENDPOINT, TG_DEFAULT_CHAT, TG_TOCKEN


def telegram_send(message, chat_id=TG_DEFAULT_CHAT):
    url = TG_ENDPOINT % (TG_TOCKEN, chat_id, message)
    gc.collect()
    return urequests.get(url)