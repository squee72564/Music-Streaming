from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.urls import reverse_lazy
from django.views.generic import CreateView, FormView, RedirectView
from django.contrib import messages

HOME_INDEX = "test1"


class LoginFormView(FormView):
    template_name = "home/login.html"
    form_class = AuthenticationForm
    success_url = reverse_lazy(HOME_INDEX)

    def form_valid(self, form):
        username = form.cleaned_data["username"]
        password = form.cleaned_data["password"]
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(self.request, user)
                return super().form_valid(form)
            else:
                messages.error(self.request, "Your account is inactive.")
        else:
            messages.error(self.request, "Invalid username or password.")
        return self.form_invalid(form)


class LogoutRedirectView(RedirectView):
    pattern_name = HOME_INDEX

    def get_redirect_url(self, *args, **kwargs):
        logout(self.request)
        return super().get_redirect_url(*args, **kwargs)


class SignupCreateView(CreateView):
    template_name = "home/signup.html"
    form_class = UserCreationForm
    success_url = reverse_lazy(HOME_INDEX)

    def form_valid(self, form):
        response = super().form_valid(form)
        username = form.cleaned_data["username"]
        password = form.cleaned_data["password1"]
        user = authenticate(username=username, password=password)
        login(self.request, user)
        return response
