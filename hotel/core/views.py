from django.shortcuts import render


def index(request):
    return render(request, 'core/index.html')

def about(request):
    return render(request, 'core/about.html')

def gallery(request):
    return render(request, 'core/gallery.html')

def contacts(request):
    return render(request, 'core/contact.html')