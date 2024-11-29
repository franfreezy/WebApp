# Generated by Django 5.1.2 on 2024-11-29 08:27

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0009_coordinatesard'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='coordinatesard',
            name='number',
            field=models.IntegerField(default=3),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='passenger',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField()),
                ('last_name', models.CharField()),
                ('phone_number', models.CharField(max_length=15)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='passenger', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.FloatField()),
                ('passenger', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='payment', to='backend.passenger')),
            ],
        ),
    ]
