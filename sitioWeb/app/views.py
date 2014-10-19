from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

import requests

# Create your views here.
def search_view(request):
    recurso = request.GET['recurso'] or ''
    url = 'http://104.131.99.190/v1/piezas/exhibicion/'
    resultado = {}
    r = ''
    if recurso == 'piezaDetail':
        codigoPieza = request.GET['codigoPieza']
        url = 'http://104.131.99.190/v1/piezas/%s' % codigoPieza.replace('-','.')
        r = requests.get(url)
    if recurso == 'investigacionDetail':
        codigoInvestigacion = request.GET['codigoInvestigacion']
        url = 'http://104.131.99.190/v1/investigaciones/%s' % codigoInvestigacion
        r = requests.get(url)
    if recurso == 'piezaInvestigaciones':
        codigoPieza = request.GET['codigoPieza']
        url = 'http://104.131.99.190/v1/investigaciones/'
        r = requests.get(url)
    if recurso == 'investigacionPiezas':
        url = 'http://104.131.99.190/v1/piezas/'
        r = requests.get(url)
    if recurso == '':
        r = requests.get(url)

    
    r.encoding = 'UTF-8'
    print "URL %s" % url
    if r.status_code == 200: 
        resultado = r.text
    return HttpResponse(resultado)