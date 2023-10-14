from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("flashcard/", include("flashcard_api.urls")),
    path("account/", include("account.urls"))
]
