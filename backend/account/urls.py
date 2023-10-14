from django.urls import path
from .views import AccountApi

urlpatterns = [
    path("", AccountApi.as_view(), name="account-list")
]
