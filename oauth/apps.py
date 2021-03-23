from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class OauthConfig(AppConfig):
    name = 'oauth'
    verbose_name = _('Authentication and Authorization')
