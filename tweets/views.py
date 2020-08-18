import random
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url
from django.conf import settings

# from rest_framework.authentication import SessionAuthentication
# from rest_framework.decorators import api_view, permission_classes, authentication_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response

# from .models import Tweet
# from .forms import TweetForm
# from .serializers import (
#    TweetSerializer,
#    TweetActionSerializer,
#    TweetCreateSerializer
# )

ALLOWED_HOSTS = settings.ALLOWED_HOSTS


def home_view(request, *args, **kwargs):
    # username = None
    # if request.user.is_authenticated:
    #     username = request.user.username
    # return render(request, "pages/home.html", context={"username": username}, status=200)
    return render(request, "pages/feed.html")  # new


def tweets_list_view(request, *args, **kwargs):
    return render(request, "tweets/list.html")


def tweets_detail_view(request, tweet_id, *args, **kwargs):
    return render(request, "tweets/detail.html", context={"tweet_id": tweet_id})


# def tweets_profile_view(request, username, *args, **kwargs):
#     return render(request, "tweets/profile.html", context={"profile_username": username})
