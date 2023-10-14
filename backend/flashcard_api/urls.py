from django.urls import path
from .views import FlashcardApi

urlpatterns = [
    path("", FlashcardApi.as_view(), name="flashcard-list")
]
