from django.core.management import BaseCommand

from api.models import Resource

resources = [
    {
        'title': 'Hello World'
    }
]


class Command(BaseCommand):
    def handle(self, *args, **options):
        self.generate_resources()

    def generate_resources(self):
        for val in resources:
            resource, created = Resource.objects.update_or_create(
                title=val['title'],
                defaults={}
            )
