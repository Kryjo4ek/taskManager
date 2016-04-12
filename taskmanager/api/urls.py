from django.conf.urls import url, include
from db import views
from tastypie.api import Api
from .api import ImplementerResource, TaskResource

# implementer_resource = ImplementerResource()
# task_resource = TaskResource()
v1_api = Api(api_name='v1')
v1_api.register(ImplementerResource())
v1_api.register(TaskResource())


urlpatterns = [
    # url(r'^api/', include(implementer_resource.urls)),
    url(r'^api/', include(v1_api.urls)),
    # url(r'^a/', views.index)

]