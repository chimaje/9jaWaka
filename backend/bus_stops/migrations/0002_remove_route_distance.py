# Generated by Django 5.0.6 on 2024-07-09 16:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bus_stops', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='route',
            name='distance',
        ),
    ]
