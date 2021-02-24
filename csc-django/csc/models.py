from django.db import models


# Create your models here.

class Country(models.Model):
    country_name = models.CharField(max_length=200)

    def __str__(self):
        return self.country_name


class State(models.Model):
    state_name = models.CharField(max_length=200)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)

    def __str__(self):
        return self.state_name


class City(models.Model):
    city_name = models.CharField(max_length=200)
    state = models.ForeignKey(State, on_delete=models.CASCADE)

    def __str__(self):
        return self.city_name
