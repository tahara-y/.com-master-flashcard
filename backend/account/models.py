from django.db import models


class Account(models.Model):
    mailAddress = models.CharField(max_length=50)
    passWord = models.CharField(max_length=50)

    def __str__(self):
        return self.mailAddress
    fff
