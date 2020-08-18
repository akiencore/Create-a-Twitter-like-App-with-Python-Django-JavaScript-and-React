from django.urls import path

from .views import profile_detail_view, profile_update_view # new

urlpatterns = [
    path('edit', profile_update_view), # new
    path('<str:username>', profile_detail_view),
]
