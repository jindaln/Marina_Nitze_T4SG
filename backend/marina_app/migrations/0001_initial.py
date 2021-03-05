# Generated by Django 3.1.7 on 2021-02-27 21:56

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='IssueArea',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('state', models.TextField()),
                ('fee', models.BooleanField(default=False)),
            ],
        ),
    ]
