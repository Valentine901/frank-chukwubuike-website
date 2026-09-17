from fastapi_mail import ConnectionConfig
from settings.config import Setting 

class Config:
    conf = ConnectionConfig(
        MAIL_USERNAME = Setting.MAIL_USERNAME,
        MAIL_PASSWORD = Setting.MAIL_PASSWORD,
        MAIL_FROM = Setting.MAIL_FROM,
        MAIL_PORT = 587,
        MAIL_SERVER = "smtp.gmail.com",  # Change to "://gmail.com" if you are using Gmail SMTP
        MAIL_FROM_NAME = "My Website",
        MAIL_STARTTLS = True,
        MAIL_SSL_TLS = False,
        USE_CREDENTIALS = True,
        VALIDATE_CERTS = True
    )

# def send_async_verification_password_reset(email_to: str, username: str, code: str):

#     # forcing the async mesage to run sychronously using asyncio
#     loop = asyncio.new_event_loop()
#     asyncio.set_event_loop(loop)
#     loop.run_until_complete(fm.send_message(message))
#     loop.close()