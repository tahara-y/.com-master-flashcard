from django.urls import path
from .views import FlashcardApi
from rest_framework.authtoken.views import obtain_auth_token
from . import views

urlpatterns = [
    path('create/', views.CreateUserView.as_view(), name='create'),
    path('profile/', views.ProfileUserView.as_view(), name='profile'),
    path('auth/', obtain_auth_token, name='auth'),
    path("flashcard/", FlashcardApi.as_view(), name="flashcard-list")
]
