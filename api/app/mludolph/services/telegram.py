import requests  # type: ignore

EMOJI_PROGRESS = "🔄"
EMOJI_HOT = "🔥"
EMOJI_CHECK = "✅"


def send_telegram_message(message: str, *, chat_id: str, token: str):
    api_call = (
        f"https://api.telegram.org/bot{token}/sendMessage"
        f"?chat_id={chat_id}&parse_mode=Markdown&text={message}"
    )
    resp = requests.get(api_call)
    return resp.json()
