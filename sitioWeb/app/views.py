from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

import requests

# Create your views here.
def search_view(request):
    recurso = request.GET['recurso'] or ''
    url = 'http://104.131.99.190/api/v1/piezas/exhibicion/'
    resultado = {}
    r = ''
    if recurso == 'piezaDetail':
        codigoPieza = request.GET['codigoPieza']
        url = 'http://104.131.99.190/api/v1/piezas/%s' % codigoPieza.replace('-','.')
        #r = requests.get(url)
    if recurso == 'investigacionDetail':
        codigoInvestigacion = request.GET['codigoInvestigacion']
        url = 'http://104.131.99.190/api/v1/investigaciones/%s' % codigoInvestigacion
        #r = requests.get(url)
    if recurso == 'piezaInvestigaciones':
        codigoPieza = request.GET['codigoPieza']
        url = 'http://104.131.99.190/api/v1/investigaciones/'    
    if recurso == 'investigacionPiezas':
        codigoInvestigacion = request.GET['codigoInvestigacion']
        url = 'http://104.131.99.190/api/v1/piezas/'
    if recurso == 'eventos':
        url = 'http://104.131.99.190/api/v1/eventos'
    if recurso == 'voluntarios':
        url = 'http://104.131.99.190/api/v1/usuarios'        
        
    headers = {'Authorization': 'oauth ea538fb5baced25bb5fa21e49310db0344139742'}
    r = requests.get(url, headers=headers)

    
    r.encoding = 'UTF-8'
    print "URL %s" % url
    print "Status code %s" % r.status_code
    if r.status_code == 200: 
        resultado = r.text
    else:
        resultado = []
    return HttpResponse(resultado)