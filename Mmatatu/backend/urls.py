from django.urls import path
from . import views
from .views import register

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    #path('', sensor_data_view, name="homepage"),
    path('register/', register, name="register"),
    path('login/', views.login),
    
    
]