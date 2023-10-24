from django.contrib import admin
from .models import Flashcard  # モデルをインポート
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from import_export.fields import Field


class FlashcardResource(resources.ModelResource):
    id = Field(attribute='id', column_name='id')
    word = Field(attribute='word', column_name='word')
    description = Field(attribute='description', column_name='description')

    class Meta:
        model = Flashcard
        skip_unchanged = True
        use_bulk = True


@admin.register(Flashcard)
class FlashcardAdmin(ImportExportModelAdmin):
    ordering = ['id']
    list_display = ('id', 'word', 'description')
    resource_class = FlashcardResource
