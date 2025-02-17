from django.urls import path
from .views import generate_rss

urlpatterns = [
    path('generate-rss/', generate_rss, name='generate_rss'),
]
