# Generated by Django 3.2.3 on 2023-03-07 16:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_users_phone'),
    ]

    operations = [
        migrations.AddField(
            model_name='productitem',
            name='img_url',
            field=models.URLField(null=True),
        ),
        migrations.AlterField(
            model_name='productitem',
            name='IPFS_hash',
            field=models.URLField(null=True),
        ),
    ]