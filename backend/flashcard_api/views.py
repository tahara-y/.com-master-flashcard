from django.contrib.auth.models import User
from rest_framework import permissions, status, viewsets
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.response import Response

from .models import ChapterNumber, Flashcard, UserProfile
from .serializers import (
    ChapterNumberSerializer,
    FlashcardSerializer,
    UserProfileSerializer,
    UserSerializer,
)


class CreateUserView(CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)

        if response.status_code == status.HTTP_201_CREATED:
            user = User.objects.get(username=response.data["username"])
            UserProfile.objects.create(user=user)

        return response


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
        if UserProfile.objects.filter(user=request.user).exists():
            return Response(
                {"detail": "User profile already exists."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    def update_profile(self, request, *args, **kwargs):
        try:
            user_profile = UserProfile.objects.get(user=request.user)
        except UserProfile.DoesNotExist:
            return Response(
                {"detail": "User profile does not exist."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.get_serializer(user_profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


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
