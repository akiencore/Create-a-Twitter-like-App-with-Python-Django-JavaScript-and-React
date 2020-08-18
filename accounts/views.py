from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm


def login_view(request, *args, **kwargs):
    form = AuthenticationForm(request, data=request.POST or None)
    if form.is_valid():
        user_ = form.get_user()  # get user from the form if the request is valid
        login(request, user_)  # login with request and user
        return redirect("/")  # back to the homepage

    context = {
        "form": form,
        "btn_label": "Login",
        "title": "Login",
    }
    return render(request, "accounts/auth.html", context)



def logout_view(request, *args, **kwargs):
    if request.method == "POST":
        logout(request)  # logout with request
        return redirect("/login")

    # context = {
    #     "form": None,
    #     "btn_label": "Logout?",
    #     "title": "Logout",
    # }
    context = {
        "form": None,
        "description": "Are you sure you want to logout?",
        "btn_label": "Click to Confirm",
        "title": "Logout",
    }
    return render(request, "accounts/auth.html", context)


def register_view(request, *args, **kwargs):
    form = UserCreationForm(request.POST or None)
    if form.is_valid():
        # print(form.cleaned_data)
        user = form.save(commit=True)
        user.set_password(form.cleaned_data.get("password1"))

        login(request, user)  # login with request and user
        return redirect("/")
    
    context = {
        "form": form,
        "btn_label": "Register",
        "title": "Register",
    }
    return render(request, "accounts/auth.html", context)
