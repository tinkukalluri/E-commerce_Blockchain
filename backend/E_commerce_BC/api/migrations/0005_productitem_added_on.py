# Generated by Django 3.2.3 on 2023-03-07 19:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_product_added_on'),
    ]

    operations = [
        migrations.AddField(
            model_name='productitem',
            name='added_on',
            field=models.DateTimeField(null=True),
        ),
    ]
