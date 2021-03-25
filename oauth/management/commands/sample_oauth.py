from django.core.management import BaseCommand

from oauth2_provider.models import get_application_model

Application = get_application_model()

applications = [
    {
        'name': 'Client Password',
        'client_type': Application.CLIENT_CONFIDENTIAL,
        'client_id': 'client_password',
        'client_secret': 'client_secret',
        'authorization_grant_type': Application.GRANT_PASSWORD,
        'skip_authorization': True
    },
    {
        'name': 'Client Credential',
        'client_type': Application.CLIENT_CONFIDENTIAL,
        'client_id': 'client_credential',
        'client_secret': 'client_secret',
        'authorization_grant_type': Application.GRANT_CLIENT_CREDENTIALS,
        'skip_authorization': True
    },
    {
        'name': 'Client Application',
        'client_type': Application.CLIENT_CONFIDENTIAL,
        'client_id': 'client_application',
        'client_secret': 'client_secret',
        'authorization_grant_type': Application.GRANT_AUTHORIZATION_CODE,
        'skip_authorization': True,
        'redirect_uris': 'https://localhost:4200 http://localhost:4200'
    },
    {
        'name': 'Introspect',
        'client_type': Application.CLIENT_CONFIDENTIAL,
        'client_id': 'client_introspect',
        'client_secret': 'client_secret',
        'authorization_grant_type': Application.GRANT_CLIENT_CREDENTIALS,
        'skip_authorization': True
    }
]


class Command(BaseCommand):
    def handle(self, *args, **options):
        for val in applications:
            application, created = Application.objects.get_or_create(
                name=val['name'],
                defaults=val
            )
