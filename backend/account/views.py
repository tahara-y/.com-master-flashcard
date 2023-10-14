from rest_framework.generics import ListCreateAPIView
from .models import Account
from .serializers import AccountSerializer
from rest_framework.permissions import IsAuthenticated


class AccountApi(ListCreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]
