import uuid

from django.db import models


class Id(models.Model):
    id = models.UUIDField(primary_key=True,
                          default=uuid.uuid4,
                          editable=False)

    class Meta:
        abstract = True


class Resource(Id):
    title = models.CharField(max_length=255, help_text='Article title')

    class Meta:
        db_table = 'resources'
        verbose_name_plural = 'Resources'

    def __str__(self):
        return '{}'.format(self.title)
