# Generated by Django 4.2.11 on 2024-05-18 06:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Cart', '0010_user_user_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='checkout',
            old_name='user',
            new_name='user_id',
        ),
    ]
