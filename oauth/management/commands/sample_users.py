from django.contrib.auth import get_user_model
from django.contrib.auth.models import Permission
from django.core.management import BaseCommand

User = get_user_model()

users = [
    {
        'username': 'User1',
        'email': 'user1@oauth-server.test',
        'is_staff': True,
        'password': 'p4ssw0rd',
    },
    {
        'username': 'User2',
        'email': 'user2@oauth-server.test',
        'is_staff': False,
        'password': 'p4ssw0rd',
    },
]


class Command(BaseCommand):
    def handle(self, *args, **options):
        for val in users:
            user, created = User.objects.update_or_create(
                email=val['email'],
                defaults={
                    'username': val['username'],
                    'is_staff': val['is_staff']
                }
            )
            if 'permissions' in val:
                for permission_name in val['permissions']:
                    permission = Permission.objects.get(name=permission_name)
                    user.user_permissions.add(permission)
            user.set_password(val['password'])
            user.save()
