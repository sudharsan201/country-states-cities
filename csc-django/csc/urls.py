from django.urls import path
from . import views

urlpatterns = [
    path('countries/', views.CountryList.as_view()),
    path('countries/<str:pk>', views.CountryDetail.as_view()),
    path('states/', views.StateList.as_view()),
    path('states/<str:pk>', views.StateDetail.as_view()),
    path('cities/', views.CityList.as_view()),
    path('cities/<str:pk>', views.CityDetail.as_view()),
]
