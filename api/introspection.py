import json

from django.contrib.auth import get_user_model
from oauthlib.oauth2 import BackendApplicationClient
from requests_oauthlib import OAuth2Session
from django.utils import timezone

from oauth.authentication import OAuthTokenExpiredError, OAuthTokenError, \
    OAuthError

User = get_user_model()


def find_user(token):
    username = token.get('username')
    if username:
        try:
            return User.objects.get_by_natural_key(username)
        except User.DoesNotExist:
            pass
    raise OAuthTokenError("AccessToken not found at all.")


def check_expired(token):
    expire = token.get('exp')
    if expire and expire < timezone.now().timestamp():
        raise OAuthTokenExpiredError('AccessToken has expired.')


class OAuthIntrospection:
    __instance = None

    def __new__(cls):
        if cls.__instance is None:
            cls.__instance = super(OAuthIntrospection, cls).__new__(cls)
            cls.__instance.__initialized = False
        return cls.__instance

    def __init__(
        self,
        client_id='client_introspect',
        client_secret='client_secret',
        scope=('introspection',),
        introspect_url='http://localhost:8080/o/introspect/',
        token_url='http://localhost:8080/o/token/',
    ):
        if self.__initialized:
            return
        self.__initialized = True
        client = BackendApplicationClient(client_id=client_id,
                                          scope=scope)
        self.__session = OAuth2Session(client=client)
        self.__session.fetch_token(token_url,
                                   client_id=client_id,
                                   client_secret=client_secret)
        self.__introspect_url = introspect_url

    def introspect(self, key):
        response = self.__session.post(self.__introspect_url, {
            'token': key
        })
        if response.status_code == 200 and response.content:
            token = json.loads(response.content)
            check_expired(token)
            return find_user(token)
        raise OAuthError("Introspect responded with status {} and {}".format(
            response.status_code, response.content))
