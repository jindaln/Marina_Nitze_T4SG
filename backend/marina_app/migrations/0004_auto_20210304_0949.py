# Generated by Django 3.1.7 on 2021-03-04 14:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marina_app', '0003_auto_20210301_1731'),
    ]

    operations = [
        migrations.RenameField(
            model_name='state',
            old_name='bestPractice1',
            new_name='electronic_request',
        ),
        migrations.RenameField(
            model_name='state',
            old_name='bestPractice2',
            new_name='no_fee',
        ),
        migrations.RemoveField(
            model_name='state',
            name='bestPractice3',
        ),
        migrations.AddField(
            model_name='state',
            name='no_notary_required',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='state',
            name='no_witness_required',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='state',
            name='office_contact',
            field=models.BooleanField(default=False),
        ),
    ]
