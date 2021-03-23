from django.contrib.auth.models import AnonymousUser
from django.utils import timezone
from oauth2_provider.models import AccessToken


class OAuthError(RuntimeError):
    def __init__(self, message='OAuth error occurred.'):
        self.message = message


class OAuthTokenError(OAuthError):
    def __init__(self, message='OAuth token error'):
        self.message = message


class OAuthTokenExpiredError(OAuthError):
    def __init__(self, message='Oauth token expired error'):
        self.message = message


def handle_oauth_user(request):
    key = None
    auth_header_value = request.META.get('HTTP_AUTHORIZATION')
    if auth_header_value:
        key = auth_header_value.split(' ')[1]
    if not key:
        request.user = AnonymousUser()
    else:
        token = verify_access_token(key)
        request.user = token.user
    return request.user


def verify_access_token(key):
    try:
        token = AccessToken.objects.get(token=key)
        if token.expires < timezone.now():
            raise OAuthTokenExpiredError('AccessToken has expired.')
    except AccessToken.DoesNotExist:
        raise OAuthTokenError("AccessToken not found at all.")
    return token
