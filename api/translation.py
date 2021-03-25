from modeltranslation.decorators import register
from modeltranslation.translator import TranslationOptions

from api.models import Resource


@register(Resource)
class ResourceTranslationOptions(TranslationOptions):
    fields = ('title',)
