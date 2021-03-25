import re

from tastypie.authorization import ReadOnlyAuthorization
from tastypie.cache import SimpleCache
from tastypie.paginator import Paginator
from tastypie.resources import ModelResource
from django.conf import settings

from api.authentication import OAuth20Authentication
from api.models import Resource
from api.serializers import CamelCaseJSONSerializer

authentication = OAuth20Authentication()
authorization = ReadOnlyAuthorization()
serializer = CamelCaseJSONSerializer()


class I18nResource(ModelResource):

    def dehydrate(self, bundle):
        current_language = bundle.request.GET.get('lang')
        languages = [lang[0] for lang in settings.LANGUAGES]
        keys = bundle.data.keys()

        for language in languages:
            i18n_fields = [key for key in keys if key.endswith('_' + language)]
            for val in i18n_fields:
                if language == current_language:
                    translation = bundle.data[val]
                    if translation:
                        # replace field with correct translation
                        field = re.sub('_{}$'.format(language), '', val)
                        bundle.data[field] = bundle.data[val]
                # delete all extra translation fields
                del bundle.data[val]

        return bundle


class ResourceResource(I18nResource):
    class Meta:
        queryset = Resource.objects.all()
        resource_name = 'resources'
        include_resource_uri = False
        paginator_class = Paginator
        authentication = authentication
        authorization = authorization
        serializer = serializer
        cache = SimpleCache(timeout=10)
