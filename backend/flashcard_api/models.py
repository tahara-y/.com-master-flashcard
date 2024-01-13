from django.db import models
from django.contrib.auth.models import User


class Flashcard(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    chapter = models.PositiveIntegerField(default=1)
    chapterWordOrder = models.CharField(max_length=5, default='00001')
    word = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)

    def __str__(self):
        return self.word


class ChapterNumber(models.Model):
    chapterId = models.PositiveIntegerField(primary_key=True)
    chapterName = models.CharField(max_length=100, default='章の名前を入力してください')
    maxNum = models.PositiveIntegerField()

    def __str__(self):
        return str(self.chapterId)


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    currentId = models.IntegerField(default=1)
    currentChapter = models.IntegerField(default=1)
    currentChapterWordOrder = models.CharField(max_length=5, default='00001')
