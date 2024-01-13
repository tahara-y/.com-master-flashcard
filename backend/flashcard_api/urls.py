from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('flashcards', views.FlashcardViewSet,  basename='flashcard')
router.register('chapterNum', views.ChapterNumberViewSet,
                basename='chapterNum')
router.register('userProfile', views.UserProfileView, basename='userProfile')

app_name = 'api'

urlpatterns = [
    path('create/', views.CreateUserView.as_view(), name='create'),
    path('profile/', views.ProfileUserView.as_view(), name='profile'),
    path('auth/', obtain_auth_token, name='auth'),
    path("", include(router.urls))
]
