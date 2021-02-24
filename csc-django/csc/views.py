from rest_framework import generics
import django_filters.rest_framework

# Create your views here.

from .models import Country, State, City
from .serializers import CountrySerializer, StateSerializer, CitySerializer


class CountryList(generics.ListCreateAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer


class CountryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer


class StateList(generics.ListCreateAPIView):
    queryset = State.objects.all()
    serializer_class = StateSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ['country']


class StateDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = State.objects.all()
    serializer_class = StateSerializer


class CityList(generics.ListCreateAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ['state']


class CityDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer
