import logging

from django.contrib.auth.models import AnonymousUser
from django.utils import timezone
from oauth2_provider.models import get_access_token_model
from tastypie.authentication import Authentication

from oauth.authentication import OAuthError, OAuthTokenExpiredError, \
    OAuthTokenError

AccessToken = get_access_token_model()


class OAuth20Authentication(Authentication):
    def is_authenticated(self, request, **kwargs):
        try:
            user = handle_oauth_user(request)
            if user.is_anonymous:
                raise OAuthError('Anonymous user')
        except OAuthError as ex:
            logging.exception(ex.message)
            return False
        return True


def handle_oauth_user(request):
    key = None
    auth_header_value = request.META.get('HTTP_AUTHORIZATION')
    if auth_header_value:
        key = auth_header_value.split(' ')[1]
    if not key:
        request.user = AnonymousUser()
    else:
        request.user = verify_access_token(key)
    return request.user


def verify_access_token(key):
    try:
        token = AccessToken.objects.get(token=key)
        if token.expires < timezone.now():
            raise OAuthTokenExpiredError('AccessToken has expired.')
    except AccessToken.DoesNotExist:
        raise OAuthTokenError("AccessToken not found at all.")
    return token.user
