from django.views.generic.base import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin


class TestReactView(LoginRequiredMixin, TemplateView):
    template_name = "spa_client.html"
