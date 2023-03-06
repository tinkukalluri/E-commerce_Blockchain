from django.shortcuts import render

# Create your views here.from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def index(request, *args, **kwargs):
    return HttpResponse('hello world from api')
