from rest_framework.generics import ListCreateAPIView
from .models import Flashcard
from .serializers import FlashcardSerializer
from rest_framework.permissions import IsAuthenticated


class FlashcardApi(ListCreateAPIView):
    queryset = Flashcard.objects.all()
    serializer_class = FlashcardSerializer
    permission_classes = [IsAuthenticated]
