from django.http import HttpResponse, HttpResponseNotAllowed

from oauth.authentication import handle_oauth_user, OAuthError


class HttpResponseUnauthorized(HttpResponse):
    status_code = 401


def oauth_request(view_function):
    def wrapper(request, *args, **kwargs):
        try:
            handle_oauth_user(request)
        except OAuthError as ex:
            return HttpResponseUnauthorized(ex.message)
        return view_function(request, *args, **kwargs)

    return wrapper


def require_oauth(view_function):
    def wrapper(request, *args, **kwargs):
        try:
            user = handle_oauth_user(request)
            if user.is_anonymous:
                raise OAuthError('Anonymous user')
        except OAuthError as ex:
            return HttpResponseUnauthorized(ex.message)
        return view_function(request, *args, **kwargs)

    return wrapper


def oauth_role(roles):
    def wrapper1(view_function):
        @oauth_request
        def wrapper2(request, *args, **kwargs):
            user = request.user
            if user.role.name not in roles:
                return HttpResponseNotAllowed('Insufficient rights')
            return view_function(request, *args, **kwargs)

        return wrapper2

    return wrapper1
