from django.contrib import admin
from .models import Flashcard  # モデルをインポート
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from import_export.fields import Field
import pandas as pd


class FlashcardResource(resources.ModelResource):
    # モデルとExcel列の対応を指定
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

    # # Excelファイルのアップロード処理
    # def import_action(self, request, *args, **kwargs):
    #     if 'input_excel' in request.FILES:
    #         excel_file = request.FILES['input_excel']

    #         # pandasを使用してExcelファイルを読み込む
    #         df = pd.read_excel(excel_file)

    #         # データベースにデータを保存
    #         for _, row in df.iterrows():
    #             wordId = row['wordId']
    #             word = row['word']
    #             description = row['description']
    #             flashcard = Flashcard(
    #                 wordId=wordId, word=word, description=description)
    #             flashcard.save()

    #         self.message_user(request, "Excelファイルのデータをインポートしました。")
    #     else:
    #         self.message_user(request, "Excelファイルがアップロードされていません。")
