# Generated by Django 3.2 on 2021-04-13 13:37

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Resource',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(help_text='Article title', max_length=255)),
                ('title_en', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_de', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_ro', models.CharField(help_text='Article title', max_length=255, null=True)),
            ],
            options={
                'verbose_name_plural': 'Resources',
                'db_table': 'resources',
            },
        ),
    ]
