from django.conf.urls import patterns, url
from django.views.generic import TemplateView
from django.conf import settings

urlpatterns = patterns('',
    (r'^$', TemplateView.as_view(template_name="index.html")),
    (r'^pieza', TemplateView.as_view(template_name="pieza.html")),
    (r'^investigacion', TemplateView.as_view(template_name="investigacion.html")),
    (r'^header/', TemplateView.as_view(template_name="partials/header.html"))
)