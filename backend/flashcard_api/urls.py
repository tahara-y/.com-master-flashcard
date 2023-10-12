from django.urls import path
from .views import FlashcardApi

urlpatterns = [
    path("flashcard/", FlashcardApi.as_view(), name="flashcard-list")
]
