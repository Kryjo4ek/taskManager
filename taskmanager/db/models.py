from django.db import models


class Implementer(models.Model):

    class Meta:
        db_table = "implementer"

    name = models.CharField(max_length=30)


class Task(models.Model):

    class Meta:
        db_table = "task"

    title = models.CharField(max_length=30)
    status = models.CharField(max_length=30)
    implementer = models.ForeignKey(Implementer)



# Create your models here.
