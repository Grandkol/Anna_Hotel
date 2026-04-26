from django.shortcuts import render

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

sender_email = "ilian10@mail.ru"
sender_password = "p912vrNYV1JQMuaKZxwz"
receiver_emails = [
    "ilian.khoroshikh@gmail.com",
    "igorimaxigori@rambler.ru",
    "agdalina2007@rambler.ru",
]
subject = "Бронь номера"


def index(request):
    if request.method == "POST":
        print(request.POST)
        arrival = request.POST.get("arrival")
        departure = request.POST.get("departure")
        guests = request.POST.get("guests")
        alias = request.POST.get("alias")
        phone = request.POST.get("phone")

        message = MIMEMultipart()
        message["From"] = sender_email
        message["To"] = ", ".join(receiver_emails)
        message["Subject"] = subject

        message_text = (
            f"У вас новое бронирование!\n"
            f"ФИО: {alias}\n"
            f"Телефон: {phone}\n"
            f"Количество гостей: {guests}\n"
            f"Дата заезда: {arrival}\n"
            f"Дата отъезда: {departure}\n"
            f"Пожалуйста отправьте ответ на запрос по номеру телефона."
        )

        message.attach(MIMEText(message_text, "plain"))
        with smtplib.SMTP("smtp.mail.ru", 587) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, receiver_emails, message.as_string())
            server.quit()

    return render(request, "core/index.html")


def about(request):
    return render(request, "core/about.html")


def gallery(request):
    return render(request, "core/gallery.html")


def contacts(request):
    return render(request, "core/contact.html")
