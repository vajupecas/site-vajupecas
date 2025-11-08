import smtplib
from email.message import EmailMessage
from utils.settings import Settings

settings = Settings()

def send_email(to_email: str, subject: str, body_html: str, body_plain: str):
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = settings.EMAIL_USER
    msg["To"] = to_email
    msg.set_content(body_plain)
    msg.add_alternative(body_html, subtype="html")

    with smtplib.SMTP_SSL(settings.EMAIL_HOST, settings.EMAIL_PORT) as smtp:
        smtp.login(settings.EMAIL_USER, settings.EMAIL_PASSWORD)
        smtp.send_message(msg)