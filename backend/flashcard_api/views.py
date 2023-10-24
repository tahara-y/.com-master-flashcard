from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Flashcard
from .serializers import FlashcardSerializer, UserSerializer
from django.shortcuts import render


class CreateUserView(CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class ProfileUserView(RetrieveAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        response = {'message': 'PUT method is not allowed!'}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def partial_update(self, request, *args, **kwargs):
        response = {'message': 'PUT method is not allowed!'}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)


class FlashcardApi(ListCreateAPIView):
    queryset = Flashcard.objects.all()
    serializer_class = FlashcardSerializer
    permission_classes = [IsAuthenticated]
