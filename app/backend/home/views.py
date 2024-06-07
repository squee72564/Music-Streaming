from django.views.generic import CreateView, TemplateView
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import logout as auth_logout


class LoginAuthenticationForm(AuthenticationForm):
    """
    This class extends the basic AuthenticationForm class used in the LoginView view.
    We can override some of the fields for the form widgets if needed.
    """

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["username"].widget.attrs.update(
            {
                "placeholder": "Enter username",
                "style": "padding: 8px",
            }
        )
        self.fields["password"].widget.attrs.update(
            {
                "placeholder": "Enter password",
                "style": "padding: 8px",
            }
        )


class LoginFormView(LoginView):
    template_name = "home/login.html"
    form_class = LoginAuthenticationForm


class LogoutInterfaceView(LoginRequiredMixin, LogoutView):
    next_page = "/accounts/login/"


class LogoutConfirmationView(LoginRequiredMixin, TemplateView):
    template_name = "home/logout_confirmation.html"


class SignupCreateView(CreateView):
    form_class = UserCreationForm
    template_name = "home/signup.html"
    success_url = "/accounts/login/"

    def form_valid(self, form):
        auth_logout(self.request)
        return super().form_valid(form)


class HomePageView(TemplateView):
    template_name = "home/home.html"
