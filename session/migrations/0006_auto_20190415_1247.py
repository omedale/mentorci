# Generated by Django 2.2 on 2019-04-15 12:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('session', '0005_auto_20190415_0524'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sessionlog',
            name='concern',
            field=models.TextField(default='', max_length=500, null=True),
        ),
    ]
