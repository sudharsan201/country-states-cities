from rest_framework import serializers
from .models import Country, State, City


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'


class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = '__all__'

    def to_representation(self, instance):
        rep = super(StateSerializer, self).to_representation(instance)
        rep['country'] = instance.country.country_name
        return rep


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = '__all__'

    def to_representation(self, instance):
        rep = super(CitySerializer, self).to_representation(instance)
        rep['state'] = instance.state.state_name
        return rep
