from django.contrib import admin
from django.urls import path


# from tweets.views import (
from .views import (
    home_view, 
    tweet_detail_view, 
    tweet_list_view,
    tweet_create_view,
    tweet_delete_view,
    tweet_action_view,
)

urlpatterns = [
    # path('admin/', admin.site.urls),
    # path('', home_view),
    
    # path('tweets', tweet_list_view),
    path('', tweet_list_view),

    # path('api/tweets/action', tweet_action_view),
    path('action/', tweet_action_view),

    # path('create-tweet', tweet_create_view),
    path('create/', tweet_create_view),

    # path('tweets/<int:tweet_id>', tweet_detail_view),
    path('<int:tweet_id>/', tweet_detail_view),

    # path('api/tweets/<int:tweet_id>/delete', tweet_delete_view),
    path('<int:tweet_id>/delete/', tweet_delete_view),
]
