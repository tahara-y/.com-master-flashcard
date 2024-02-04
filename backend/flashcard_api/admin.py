from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from import_export.fields import Field

from .models import ChapterNumber, Flashcard, UserProfile


class FlashcardResource(resources.ModelResource):
    id = Field(attribute="id", column_name="id")
    word = Field(attribute="word", column_name="word")
    description = Field(attribute="description", column_name="description")

    class Meta:
        model = Flashcard
        skip_unchanged = True
        use_bulk = True


class ChapterNumberResource(resources.ModelResource):
    chapterId = Field(attribute="chapterId", column_name="chapterId")
    maxNum = Field(attribute="maxNum", column_name="maxNum")

    class Meta:
        model = ChapterNumber
        skip_unchanged = True
        use_bulk = True


class UserProfileResource(resources.ModelResource):
    user = Field(attribute="user", column_name="username")
    currentId = Field(attribute="currentId", column_name="currentId")
    currentChapter = Field(attribute="currentChapter", column_name="currentChapter")
    currentChapterWordOrder = Field(
        attribute="currentChapterWordOrder", column_name="currentChapterWordOrder"
    )

    class Meta:
        model = UserProfile
        skip_unchanged = True
        use_bulk = True


@admin.register(Flashcard)
class FlashcardAdmin(ImportExportModelAdmin):
    ordering = ["id"]
    list_display = ("id", "chapter", "chapterWordOrder", "word", "description")
    resource_class = FlashcardResource


@admin.register(ChapterNumber)
class ChapterNumberAdmin(ImportExportModelAdmin):
    list_display = ("chapterId", "maxNum")
    resource_class = ChapterNumberResource


@admin.register(UserProfile)
class UserProfileAdmin(ImportExportModelAdmin):
    list_display = (
        "get_username",
        "currentId",
        "currentChapter",
        "currentChapterWordOrder",
    )
    resource_class = UserProfileResource

    def get_username(self, obj):
        return obj.user.username

    get_username.short_description = "Username"
