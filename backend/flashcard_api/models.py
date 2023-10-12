from django.db import models


class Flashcard(models.Model):
    id = models.CharField(primary_key=True, max_length=10)
    word = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)

    def __str__(self):
        return self.word
