from django.views.generic import CreateView, TemplateView
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth.mixins import LoginRequiredMixin


class LoginFormView(LoginView):
    template_name = "home/login.html"


class LogoutInterfaceView(LoginRequiredMixin, LogoutView):
    next_page = "/accounts/login/"


class LogoutConfirmationView(LoginRequiredMixin, TemplateView):
    template_name = "home/logout_confirmation.html"


class SignupCreateView(CreateView):
    form_class = UserCreationForm
    template_name = "home/signup.html"
    success_url = "/accounts/login/"


class HomePageView(TemplateView):
    template_name = "home/home.html"
