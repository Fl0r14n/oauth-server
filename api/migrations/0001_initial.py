# Generated by Django 3.1.7 on 2021-03-25 10:23

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
                ('title_af', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_ar', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_ar_dz', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_ast', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_az', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_bg', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_be', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_bn', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_br', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_bs', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_ca', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_cs', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_cy', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_da', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_de', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_dsb', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_el', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_en', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_en_au', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_en_gb', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_eo', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_es', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_es_ar', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_es_co', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_es_mx', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_es_ni', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_es_ve', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_et', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_eu', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_fa', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_fi', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_fr', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_fy', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_ga', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_gd', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_gl', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_he', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_hi', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_hr', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_hsb', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_hu', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_hy', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_ia', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_ind', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_ig', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_io', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_is', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_it', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_ja', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_ka', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_kab', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_kk', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_km', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_kn', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_ko', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_ky', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_lb', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_lt', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_lv', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_mk', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_ml', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_mn', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_mr', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_my', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_nb', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_ne', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_nl', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_nn', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_os', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_pa', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_pl', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_pt', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_pt_br', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_ro', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_ru', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_sk', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_sl', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_sq', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_sr', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_sr_latn', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_sv', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_sw', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_ta', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_te', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_tg', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_th', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_tk', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_tr', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_tt', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_udm', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_uk', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_ur', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_uz', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_vi', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_zh_hans', models.CharField(help_text='Article title', max_length=255, null=True)),
                ('title_zh_hant', models.CharField(help_text='Article title', max_length=255, null=True)),
            ],
            options={
                'verbose_name_plural': 'Resources',
                'db_table': 'resources',
            },
        ),
    ]
