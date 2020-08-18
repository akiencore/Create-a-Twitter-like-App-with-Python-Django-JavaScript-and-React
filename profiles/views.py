from django.shortcuts import render
from django.http import Http404

from .models import Profile
from .forms import ProfileForm


def profile_update_view(request, *args, **kwargs):
    if not request.user.is_authenticated:  # is_authenticated()
        return redirect("/login?next=/profile/update")
    user = request.user
    user_data = {  
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email
    }
    my_profile = request.user.profile
    # form = ProfileForm(request.POST or None, instance=my_profile)
    form = ProfileForm(request.POST or None,
                       instance=my_profile, initial=user_data) # fill in hse data if exists
    if form.is_valid():
        profile_obj = form.save(commit=False)
        first_name = form.cleaned_data.get('first_name')
        last_name = form.cleaned_data.get('last_name')
        # email_address = form.cleaned_data.get('email_address')
        email = form.cleaned_data.get('email')  # to fit changed name
        user.first_name = first_name
        user.last_name = last_name
        # user.email_address = email_address
        user.email = email  # to fit changed name
        user.save()
        profile_obj.save()
    context = {
        "form": form,
        "btn_label": "Save",
        "title": "Update Profile"
    }
    return render(request, "profiles/form.html", context)


def profile_detail_view(request, username, *args, **kwargs):
    # get the profile for passed username
    qs = Profile.objects.filter(user__username=username)
    if not qs.exists():
        raise Http404
    profile_obj = qs.first()

    # new, check "is the user who sent request following this profile?"
    is_following = False
    if request.user.is_authenticated:
        user = request.user
        is_following = user in profile_obj.followers.all()  
        # OR
        # is_following = profile_obj in user.following.all()

    context = {
        "username": username,
        "profile": profile_obj,
        "is_following": is_following,  
    }

    return render(request, "profiles/detail.html", context)
