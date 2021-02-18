from telegram import telegram_send


def logs_error(message):
    print(message)
    telegram_send(message)

def logs_info(message):
    logs_error(message)