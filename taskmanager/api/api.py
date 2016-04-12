from tastypie import fields
from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from db.models import Implementer, Task


class ImplementerResource(ModelResource):

    class Meta:
        queryset = Implementer.objects.all()
        resource_name = 'implementers'
        authorization = Authorization()


class TaskResource(ModelResource):
    implementer = fields.ForeignKey(ImplementerResource, 'implementer', full=True)

    class Meta:
        queryset = Task.objects.all()
        resource_name = 'tasks'
        authorization = Authorization()
