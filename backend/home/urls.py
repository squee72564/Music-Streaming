from django.urls import path
from .views import *

urlpatterns = [
    path("login/", LoginFormView.as_view(), name="login"),
    path("logout/", LogoutConfirmationView.as_view(), name="logout_confirmation"),
    path("logout-confirmed/", LogoutInterfaceView.as_view(), name="logout_interface"),
    path("signup/", SignupCreateView.as_view(), name="signup"),
]
