from rest_framework import serializers
from .models import Flashcard, ChapterNumber, UserProfile
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')
        extra_kwargs = {'password': {
            'write_only': True,
            'required': True,
        }}

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class FlashcardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flashcard
        fields = ['id', 'chapter', 'chapterWordOrder', 'word', 'description']


class ChapterNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChapterNumber
        fields = ['chapterId', 'chapterName', 'maxNum']


class UserProfileSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = UserProfile
        fields = ['user', 'currentId',
                  'currentChapter', 'currentChapterWordOrder']
