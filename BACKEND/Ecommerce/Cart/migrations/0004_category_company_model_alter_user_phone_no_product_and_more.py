# Generated by Django 4.2.11 on 2024-05-01 04:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Cart', '0003_user_phone_no'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('logo', models.ImageField(blank=True, null=True, upload_to='company_logos/')),
            ],
        ),
        migrations.CreateModel(
            name='Model',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('image', models.ImageField(blank=True, null=True, upload_to='model_images/')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Cart.category')),
            ],
        ),
        migrations.AlterField(
            model_name='user',
            name='phone_no',
            field=models.BigIntegerField(null=True),
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('size', models.CharField(max_length=20)),
                ('color', models.CharField(max_length=50)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Cart.category')),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Cart.company')),
                ('model', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Cart.model')),
            ],
        ),
        migrations.AddField(
            model_name='category',
            name='company',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Cart.company'),
        ),
    ]
