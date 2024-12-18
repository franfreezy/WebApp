# Generated by Django 5.1.2 on 2024-11-23 09:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_gsm_coords'),
    ]

    operations = [
        migrations.CreateModel(
            name='Fare',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Route', models.CharField()),
                ('Rate', models.FloatField()),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.DeleteModel(
            name='batt',
        ),
        migrations.DeleteModel(
            name='GSCoordinates',
        ),
        migrations.DeleteModel(
            name='gsm_coords',
        ),
        migrations.DeleteModel(
            name='humidity',
        ),
        migrations.DeleteModel(
            name='Images',
        ),
        migrations.DeleteModel(
            name='location',
        ),
        migrations.DeleteModel(
            name='smoke',
        ),
        migrations.DeleteModel(
            name='soilph',
        ),
        migrations.DeleteModel(
            name='soilprecipitation',
        ),
        migrations.DeleteModel(
            name='temperature',
        ),
    ]
