from rest_framework import permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from .models import Flashcard, ChapterNumber, UserProfile
from .serializers import (
    FlashcardSerializer,
    UserSerializer,
    ChapterNumberSerializer,
    UserProfileSerializer,
)


class CreateUserView(CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class ProfileUserView(RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        response = {"message": "PUT method is not allowed!"}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def partial_update(self, request, *args, **kwargs):
        response = {"message": "PUT method is not allowed!"}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)


class UserProfileView(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserProfile.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        # ユーザーに関連する既存のエントリを検索
        user_progress, created = UserProfile.objects.get_or_create(
            user=request.user,
            defaults=request.data
        )

        # 既存のエントリが見つかった場合は、データを更新
        if not created:
            for key, value in request.data.items():
                setattr(user_progress, key, value)
            user_progress.save()

        serializer = self.get_serializer(user_progress)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)


class FlashcardViewSet(viewsets.ModelViewSet):
    serializer_class = FlashcardSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Flashcard.objects.all()
        chapter = self.request.query_params.get("chapter")
        chapterWordOrder = self.request.query_params.get("chapterWordOrder")

        if chapter is not None:
            queryset = queryset.filter(chapter=chapter)
        if chapterWordOrder is not None:
            queryset = queryset.filter(chapterWordOrder=chapterWordOrder)

        return queryset


class ChapterNumberViewSet(viewsets.ModelViewSet):
    queryset = ChapterNumber.objects.all()
    serializer_class = ChapterNumberSerializer
    permission_classes = [permissions.AllowAny]
