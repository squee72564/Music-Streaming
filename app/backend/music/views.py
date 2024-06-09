from django.views.generic.base import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin


class ReactView(LoginRequiredMixin, TemplateView):
    template_name = "react_client.html"
