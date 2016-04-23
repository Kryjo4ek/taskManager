from tastypie import fields
from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.serializers import Serializer
from db.models import Implementer, Task


class ImplementerResource(ModelResource):

    class Meta:
        queryset = Implementer.objects.all()
        resource_name = 'implementers'
        authorization = Authorization()
        always_return_data = True
        serializer = Serializer(formats=['json', 'jsonp', 'xml', 'yaml', 'plist'])


class TaskResource(ModelResource):
    implementer = fields.ForeignKey(ImplementerResource, 'implementer', full=True)

    class Meta:
        queryset = Task.objects.all()
        resource_name = 'tasks'
        authorization = Authorization()
        always_return_data = True
        serializer = Serializer(formats=['json', 'jsonp', 'xml', 'yaml', 'plist'])
