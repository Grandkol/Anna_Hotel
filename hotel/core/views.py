from django.shortcuts import render
import telebot
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

#ТЕЛЕГРАМ ИНФА БОТ
bot = telebot.TeleBot(token='6969064571:AAHk6Fknal4LU84NeZdWP0XscLh1RZowQUI')
user_id = '1194456882' #МАМА
user_id2 = '889050360' #ИЛИАН
user_id3 = '5421958941' #ПАПА
# user_id = '277237246' #ЭЛИНА

#ПОЧТА ИНФА
sender_email = "ilian10@mail.ru"
sender_password = "p912vrNYV1JQMuaKZxwz"
receiver_email = "ilian.khoroshikh@gmail.com"
subject = "Бронь номера"
message_text = "Текст вашего сообщения"




def index(request):
    if request.method == 'POST':
        print(request.POST)
        arrival = request.POST.get('arrival')
        arrival = arrival.replace("-", "\.")
        departure = request.POST.get('departure')
        departure = departure.replace("-", "\.")
        guests = request.POST.get('guests')
        alias = request.POST.get('alias')
        phone = request.POST.get('phone')

        #ОТПРАВКА В ТГ
        message_text = (f'*У вас новое бронирование\!* '
                   f'ФИО: {alias}\.  ' 
                   f'Телефон: *{phone}*\.  ' 
                   f'Количество гостей: *{guests}*\.  ' 
                   f'Дата заезда: *{arrival}*\.  ' 
                   f'Дата отъезда: *{departure}*\.  ' 
                   f'Пожалуйста отправьте ответ на запрос по *номеру телефона*\.')
        bot.send_message(chat_id=user_id, text=message_text, parse_mode='MarkdownV2')
        bot.send_message(chat_id=user_id2, text=message_text, parse_mode='MarkdownV2')
        bot.send_message(chat_id=user_id3, text=message_text, parse_mode='MarkdownV2')
        #ОТПРАВКА ПО ПОЧТЕ
        message = MIMEMultipart()
        message["From"] = sender_email
        message["To"] = receiver_email
        message["Subject"] = subject

        message_text = (f'*У вас новое бронирование!  '
                   f'ФИО: {alias}.  ' 
                   f'Телефон: {phone}.  ' 
                   f'Количество гостей: {guests}.  ' 
                   f'Дата заезда: {arrival}.  ' 
                   f'Дата отъезда: {departure}.  ' 
                   f'Пожалуйста отправьте ответ на запрос по *номеру телефона.')

        message.attach(MIMEText(message_text, "plain"))
        with smtplib.SMTP("smtp.mail.ru", 587) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, receiver_email, message.as_string())
            server.quit()







    return render(request, 'core/index.html')

def about(request):
    return render(request, 'core/about.html')

def gallery(request):
    return render(request, 'core/gallery.html')

def contacts(request):
    return render(request, 'core/contact.html')