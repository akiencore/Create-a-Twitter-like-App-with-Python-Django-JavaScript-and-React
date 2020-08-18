from rest_framework.pagination import PageNumberPagination
import random
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url
from django.conf import settings

from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


# from .models import Tweet
# from .forms import TweetForm
# from .serializers import (
#     TweetSerializer,
#     TweetActionSerializer,
#     TweetCreateSerializer
# )

from ..models import Tweet
from ..forms import TweetForm
from ..serializers import (
    TweetSerializer,
    TweetActionSerializer,
    TweetCreateSerializer
)

ALLOWED_HOSTS = settings.ALLOWED_HOSTS


# def home_view(request, *args, **kwargs):
#    username = None
#    if request.user.is_authenticated:
#        username = request.user.username
#    return render(request, "pages/home.html", context={"username": username}, status=200)

# def local_tweets_list_view(request, *args, **kwargs):
#    return render(request, "tweets/list.html")

# def local_tweets_detail_view(request, tweet_id, *args, **kwargs):
#    return render(request, "tweets/detail.html", context={"tweet_id": tweet_id})

# def local_tweets_profile_view(request, username, *args, **kwargs):
#    return render(request, "tweets/profile.html", context={"profile_username": username})


@api_view(['POST']) 
# @authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def tweet_create_view(request, *args, **kwargs):
    print(request.user)
    serializer = TweetCreateSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):  # send back what the error is
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response({}, status=400)


def tweet_create_view_pure_django(request, *args, **kwargs):
    user = request.user
    if not request.user.is_authenticated:
        user = None
        if request.is_ajax():
            return JsonResponse({}, status=401)
        return redirect(settings.LOGIN_URL)

    form = TweetForm(request.POST or None)
    print('post data is', request.POST)
    next_url = request.POST.get("next") or None
    if form.is_valid():
        obj = form.save(commit=False)
        obj.user = request.user
        obj.save()
        if request.is_ajax():
            return JsonResponse(obj.serialize(), status=201)
        if next_url != None and is_safe_url(next_url, ALLOWED_HOSTS):
            return redirect(next_url)
        form = TweetForm()
    if form.errors:
        if request.is_ajax():
            return JsonResponse(form.errors, status=400)

    return render(request, 'components/form.html', context={"form": form})


'''
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def tweet_feed_view(request, *args, **kwargs):
    paginator = PageNumberPagination()  
    paginator.page_size = 20  

    user = request.user
    qs = Tweet.objects.feed(user)

    paginated_qs = paginator.paginate_queryset(qs, request) 
    serializer = TweetSerializer(paginated_qs, many=True)

    return paginator.get_paginated_response(serializer.data)
'''


def get_paginated_queryset_response(qs, request):
    paginator = PageNumberPagination()
    paginator.page_size = 20

    paginated_qs = paginator.paginate_queryset(qs, request)
    # serializer = TweetSerializer(paginated_qs, many=True)
    serializer = TweetSerializer(paginated_qs, many=True, context={"request": request})

    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def tweet_feed_view(request, *args, **kwargs):
    user = request.user
    qs = Tweet.objects.feed(user)
    return get_paginated_queryset_response(qs, request)


@api_view(['GET'])
def tweet_list_view(request, *args, **kwargs):
    qs = Tweet.objects.all()
    username = request.GET.get('username')
    if username != None:
        qs = qs.by_username(username)
    return get_paginated_queryset_response(qs, request)


def tweet_list_view_pure_django(request, *args, **kwargs):
    qs = Tweet.objects.all()  # grab all objects in Tweet
    # tweets_list = [{"id" : x.id, "content" : x.content, "likes" : random.randint(0, 1000)} for x in qs]
    tweets_list = [x.serialize() for x in qs]
    data = {
        "isUser": False,
        "response": tweets_list
    }
    return JsonResponse(data)


@api_view(['GET'])  # http method the client === GET
def tweet_detail_view(request, tweet_id, *args, **kwargs):
    qs = Tweet.objects.filter(id=tweet_id)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    serializer = TweetSerializer(obj)
    return Response(serializer.data, status=200)


def tweet_detail_view_pure_django(request, tweet_id, *args, **kwargs):

    data = {
        "id": tweet_id,
    }
    status = 200

    try:
        obj = Tweet.objects.get(id=tweet_id)
        data['content'] = obj.content
    except:
        data['message'] = "Not found"
        status = 404

    return JsonResponse(data, status=status)


@api_view(['DELETE', 'POST'])
@permission_classes([IsAuthenticated])
def tweet_delete_view(request, tweet_id, *args, **kwargs):
    qs = Tweet.objects.filter(id=tweet_id)
    if not qs.exists():
        return Response({}, status=404)
    qs = qs.filter(user=request.user)
    if not qs.exists():
        return Response({"message": "You cannot delete this tweet"}, status=401)
    obj = qs.first()
    obj.delete()
    return Response({"Tweet removed"}, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tweet_action_view(request, *args, **kwargs):
    # id is required
    # action: like, unlike, retweet
    serializer = TweetActionSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        tweet_id = data.get("id")
        action = data.get("action")
        content = data.get("content")

        qs = Tweet.objects.filter(id=tweet_id)
        if not qs.exists():
            return Response({}, status=404)
        obj = qs.first()
        if action == "like":
            # add the current user into the like list
            obj.likes.add(request.user)
            serializer = TweetSerializer(obj)
            return Response(serializer.data, status=200)
        elif action == "unlike":
            # remove the current user from the like list
            obj.likes.remove(request.user)
            serializer = TweetSerializer(obj)
            return Response(serializer.data, status=200)
        elif action == "retweet":
            new_tweet = Tweet.objects.create(
                user=request.user,
                parent=obj,
                content=content
            )
            serializer = TweetSerializer(new_tweet)
            # return Response(serializer.data, status=200)
            return Response(serializer.data, status=201)
    return Response({}, status=200)
