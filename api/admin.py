from django.contrib import admin
from modeltranslation.admin import TabbedTranslationAdmin

from api.models import Resource


@admin.register(Resource)
class ResourceAdmin(TabbedTranslationAdmin):
    group_fieldsets = True
    list_display = ('title',)
    list_filter = ()
    search_fields = ('title',)
    fieldsets = (
        ('Content', {
            'fields': ('title',)
        }),
    )
