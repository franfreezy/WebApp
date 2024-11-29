from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
import json
from rest_framework.views import APIView
# from Backend.models import smoke,batt,temperature,soilph,soilprecipitation
from backend.models import coordinatesArd,Passenger
from django.views.decorators.csrf import csrf_exempt

@permission_classes([AllowAny])
def add_passenger(request):
    if request.method == "POST":
        full_name = request.POST.get("full_name", "").strip()
        phone_number = request.POST.get("phone_number", "").strip()
        email = request.POST.get("email", "").strip()

        # Validate input
        if not full_name or not phone_number or not email:
            return JsonResponse({"error": "Full name, phone number, and email are required."}, status=400)

        # Split the full name into first and last names
        name_parts = full_name.split()
        first_name = name_parts[0]
        last_name = " ".join(name_parts[1:]) if len(name_parts) > 1 else ""

        # Get or create the user
        user, created = User.objects.get_or_create(email=email, defaults={
            
            'first_name': first_name,
            'last_name': last_name,
        })

        # Check if the user already has a passenger profile
        if hasattr(user, 'passenger'):
            return JsonResponse({"error": "This user already has a passenger profile."}, status=400)

        # Create the passenger profile
        passenger = Passenger.objects.create(
            user=user,
            first_name=first_name,
            last_name=last_name,
            phone_number=phone_number,
        )

        return JsonResponse({
            "message": "Passenger added successfully!",
            
        })

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=400)


@permission_classes([AllowAny])
class driverapi(APIView):
    def post(self, request, *args, **kwargs):
        try:
            if isinstance(request.data, dict) and '_content' not in request.data:
                data = request.data
                print("Parsed as JSON:", data)
            else:
                # Convert QueryDict to a dictionary
                data = dict(request.data)
                print("QueryDict Data:", data)

                # Extract JSON content from '_content' key
                # Assuming '_content' exists in QueryDict
                data_json = data.get('_content', '')
                print(data_json)
                data_json = data_json[0].replace(
                    "\r\n", "")  
                data = json.loads(data_json)
                print("Extracted Data:", data)

            
            longitude = data.get('longitude')
            latitude = data.get('latitude')
            number = data.get('number')

            if longitude is None and latitude is None and number is None:
                return Response({"error": "Missing fields"}, status=status.HTTP_400_BAD_REQUEST)

            coordinate_data = coordinatesArd(
                longitude=longitude,
                latitude=latitude,
                number=number


            )
            coordinate_data.save()

            return Response({"message": "Success", "data": data}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@permission_classes([AllowAny])
class passapi(APIView):
    def post(self, request, *args, **kwargs):
        try:
            # Check if request.data is a dictionary (it will be if the content is JSON)
            if isinstance(request.data, dict) and '_content' not in request.data:
                data = request.data
                print("Parsed as JSON:", data)
            else:
                # Convert QueryDict to a dictionary
                data = dict(request.data)
                print("QueryDict Data:", data)

                data_json = data.get('_content', '')
                print(data_json)
                data_json = data_json[0].replace("\r\n", "")
                data = json.loads(data_json)
                print("Extracted Data:", data)

            longitude = data.get('longitude')

            latitude = data.get('latitude')

            # Simple validation check
            if location is None:
                return Response({"error": "Missing fields"}, status=status.HTTP_400_BAD_REQUEST)

            location_data = location(
                location=location

            )
            location_data.save()
            return Response({"message": "Success", "data": data}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@permission_classes([AllowAny])
class gsmcoords(APIView):
    def post(self, request, *args, **kwargs):
        try:

            if isinstance(request.data, dict) and '_content' not in request.data:
                data = request.data
                print("Parsed as JSON:", data)
            else:
                data = dict(request.data)
                data_json = data.get('_content', '')
                data_json = data_json[0].replace("\r\n", "")
                data = json.loads(data_json)
                print("Extracted Data:", data)

            longitude = data.get('longitude')
            latitude = data.get('latitude')

            if longitude is None and latitude is None:
                return Response({"error": "Missing fields"}, status=status.HTTP_400_BAD_REQUEST)

            coords_data = gsm_coords(
                longitude=longitude,
                latitude=latitude
            )
            coords_data.save()
            return Response({"message": "Success", "data": data}, status=status.HTTP_200_OK)

        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)})
