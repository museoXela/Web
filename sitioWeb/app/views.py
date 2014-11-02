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
        url = 'http://104.131.99.190/web/v1/exhibicion/%s' % codigoPieza
        #r = requests.get(url)
    if recurso == 'investigacionDetail':
        codigoInvestigacion = request.GET['codigoInvestigacion']
        url = 'http://104.131.99.190/web/v1/investigaciones/%s' % codigoInvestigacion
        #r = requests.get(url)
    if recurso == 'piezaInvestigaciones':
        codigoPieza = request.GET['codigoPieza']
        url = 'http://104.131.99.190/web/v1/exhibicion/%s/investigaciones' % codigoPieza   
    if recurso == 'investigacionPiezas':
        codigoInvestigacion = request.GET['codigoInvestigacion']
        url = 'http://104.131.99.190/web/v1/investigaciones/%s/piezas' % codigoInvestigacion
    if recurso == 'eventos':
        url = 'http://104.131.99.190/web/v1/eventos'
    if recurso == 'voluntarios':
        url = 'http://104.131.99.190/web/v1/voluntarios'
    if recurso == 'search-investigaciones':
        keyword = request.GET['keyword']
        url = 'http://104.131.99.190/web/v1/investigaciones/buscar/?keyword=%s' %  keyword
    if recurso == 'search-piezas':
        keyword = request.GET['keyword']
        url = 'http://104.131.99.190/web/v1/exhibicion/buscar/?keyword=%s' % keyword
    if recurso == 'colecciones':
        url = 'http://104.131.99.190/web/v1/colecciones/'
    if recurso == 'coleccionCategorias':
        idColeccion = request.GET['coleccion']
        url = 'http://104.131.99.190/web/v1/categorias/?coleccion=%s' % idColeccion
    if recurso == 'coleccionesClasificacion':
        idColeccion = request.GET['coleccion']
        idCategoria = request.GET['categoria']
        url = 'http://104.131.99.190/web/v1/clasificacion/?coleccion=%s&categoria=%s' % (idColeccion, idCategoria)
    if recurso == 'piezasExhibicion':
        url = 'http://104.131.99.190/web/v1/exhibicion'
    if recurso == 'piezasColeccion':
        idColeccion = request.GET['coleccion']
        url = 'http://104.131.99.190/web/v1/exhibicion/?coleccion=%s' % idColeccion
    if recurso == 'piezasCategoria':
        idColeccion = request.GET['coleccion']
        idCategoria = request.GET['categoria']
        url = 'http://104.131.99.190/web/v1/exhibicion/?coleccion=%s&categoria=%s' % (idColeccion,idCategoria)
    if recurso == 'piezasClasificacion':
        idColeccion = request.GET['coleccion']
        idCategoria = request.GET['categoria']
        idClasificacion = request.GET['clasificacion']
        url = 'http://104.131.99.190/web/v1/exhibicion/?coleccion=%s&categoria=%s&clasificacion=%s' % (idColeccion, idCategoria, idClasificacion)
    if recurso == 'coleccion':
        idColeccion = request.GET['coleccion']
        url = 'http://104.131.99.190/web/v1/colecciones/%s' % (idColeccion)
    if recurso == 'categoria':
        idCategoria = request.GET['categoria']
        url = 'http://104.131.99.190/web/v1/categorias/%s' % (idCategoria)
    if recurso == 'clasificacion':
        idClasificacion = request.GET['clasificacion']
        url = 'http://104.131.99.190/web/v1/clasificacion/%s' % (idClasificacion)

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