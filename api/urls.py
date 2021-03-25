from django.urls import include, path

from tastypie.api import Api

from api.resources import ResourceResource

api_version = 'v1'

v1_api = Api(api_name=api_version)
v1_api.register(ResourceResource())

urlpatterns = [
    path('api/', include(v1_api.urls)),
]
