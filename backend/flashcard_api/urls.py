from django.urls import include, path
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register("flashcards", views.FlashcardViewSet, basename="flashcard")
router.register("chapterNum", views.ChapterNumberViewSet, basename="chapterNum")
router.register("userProfile", views.UserProfileView, basename="userProfile")

app_name = "api"

urlpatterns = [
    path("create/", views.CreateUserView.as_view(), name="create"),
    path("update/", views.UpdateUserView.as_view(), name="update"),
    path("profile/", views.ProfileUserView.as_view(), name="profile"),
    path("auth/", obtain_auth_token, name="auth"),
    path("", include(router.urls)),
]
