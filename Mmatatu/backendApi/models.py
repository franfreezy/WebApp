from django.db import models

class gsmcoords(models.Model):
    latitude = models.FloatField()  
    longitude = models.FloatField()  
    timestamp = models.DateTimeField(auto_now_add=True)
     

    def __str__(self):
        return self.name

