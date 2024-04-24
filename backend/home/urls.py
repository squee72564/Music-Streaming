from django.urls import path
from .views import *
from django.views.generic import TemplateView

urlpatterns = [
    path("login/", LoginFormView.as_view(), name="login"),
    path("logout/", LogoutRedirectView.as_view(), name="logout"),
    path("signup/", SignupCreateView.as_view(), name="signup"),
]
