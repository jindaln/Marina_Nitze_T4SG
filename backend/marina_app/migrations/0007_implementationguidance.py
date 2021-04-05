# Generated by Django 3.1.7 on 2021-03-20 02:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marina_app', '0006_auto_20210311_1917'),
    ]

    operations = [
        migrations.CreateModel(
            name='ImplementationGuidance',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('question', models.TextField()),
                ('why', models.TextField()),
                ('quote', models.TextField()),
                ('link', models.URLField()),
            ],
        ),
    ]
