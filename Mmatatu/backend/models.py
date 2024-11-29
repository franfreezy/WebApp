from django.contrib.auth.models import User
from django.db import models


class Coordinates(models.Model):
    latitude = models.FloatField()
    longitude = models.FloatField()
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Lat: {self.latitude}, Long: {self.longitude}"
class coordinatesArd(models.Model):
    latitude = models.FloatField()
    longitude = models.FloatField()
    number=models.IntegerField()
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Lat: {self.latitude}, Long: {self.longitude}, pass: {self.number}"
    
class passenger(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='passenger')
    first_name = models.CharField()
    last_name = models.CharField()
    phone_number  =  models.CharField(max_length=15)
    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.user.email})"

class Payment(models.Model):
    passenger = models.OneToOneField(passenger, on_delete=models.CASCADE, related_name='payment')
    amount = models.FloatField()

    def __str__(self):
        return f"Payment by {self.passenger.phone_number}: {self.amount}"
    
        
class Fare(models.Model):
    route_id = models.CharField()
    route_start = models.CharField()
    route_end = models.CharField()
    Rate = models.FloatField()
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Lat: {self.Route}, Long: {self.Rate}"
    
class Bus(models.Model):
    STATUS_CHOICES = (
        ('Active', 'Active'),
        ('Inactive', 'Inactive'),
    )

    id = models.CharField(max_length=10, unique=True, primary_key=True)
    routeStart = models.CharField(max_length=100)
    routeEnd = models.CharField(max_length=100)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Active')
    capacity = models.PositiveIntegerField()
    passengerCount = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Bus {self.id} - {self.route_start} to {self.route_end}"