import json
import re
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST

from oauth.decorators import oauth_request, require_oauth
from oauth.forms import UserAddForm, UserEditForm


@require_GET
@oauth_request
def current_user(request):
    user = request.user
    return _user_response(user)


@require_POST
@csrf_exempt
@oauth_request
def register_user(request):
    form = UserAddForm(request.POST)
    if form.is_valid():
        user = form.save()
        return _user_response(user, status_code=201)
    else:
        return _form_errors(form)


@require_POST
@csrf_exempt
@require_oauth
def edit_user(request):
    form = UserEditForm(request.POST)
    if form.is_valid():
        user = form.save()
        return _user_response(user)
    else:
        return _form_errors(form)


def _user_response(user, status_code=200):
    response = {k: getattr(user, k) for k in
                ('username', 'email', 'is_active', 'is_anonymous', 'first_name',
                 'last_name') if
                hasattr(user, k)}
    if hasattr(user, 'picture') and user.picture:
        response['picture'] = user.picture.url
    return HttpResponse(json.dumps(_camelize(response)),
                        content_type='application/json', status=status_code)


def _form_errors(form):
    return HttpResponse(json.dumps(_camelize(form.errors)),
                        content_type='application/json', status=400)


def _camelize(data):
    def underscore_to_camel(match):
        return match.group()[0] + match.group()[2].upper()

    if isinstance(data, dict):
        new_dict = {}
        for key, value in data.items():
            new_key = re.sub(r"[a-z]_[a-z]", underscore_to_camel, key)
            new_dict[new_key] = _camelize(value)
        return new_dict
    if isinstance(data, (list, tuple)):
        for i in range(len(data)):
            data[i] = _camelize(data[i])
        return data
    return data
