from django.contrib import admin
from .models import Implementer, Task

# class ImplementersAdmin(admin.ModelAdmin):
#     fields = ['name_implementers']
# Register your models here.
admin.site.register(Implementer)
admin.site.register(Task)