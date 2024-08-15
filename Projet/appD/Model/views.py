from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import pickle
import os
from .models import AppUser , Favoris
from django.http import HttpResponse, JsonResponse
class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            if user:
                user_data = UserSerializer(user).data
                return Response(user_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        assert validate_email(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data['user']
            login(request, user)
            user_data = UserSerializer(user).data
            return Response(user_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)



# Charger les modèles et les données au démarrage du serveur
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VECTOR_PATH = os.path.join(BASE_DIR, 'D:/IID2/S2/Projet tuto/tfidf_vectorizer.pkl')
MATRIX_PATH = os.path.join(BASE_DIR, 'D:/IID2/S2/Projet tuto/tfidf_matrix.pkl')
DATA_PATH = os.path.join(BASE_DIR, 'D:/IID2/S2/Projet tuto/job_data.csv')
with open(VECTOR_PATH, 'rb') as f:
    vectorizer = pickle.load(f)
with open(MATRIX_PATH, 'rb') as f:
    tfidf_matrix = pickle.load(f)
    
job_data = pd.read_csv(DATA_PATH)

from django.http import JsonResponse
from .models import AppUser  # Assurez-vous d'importer votre modèle AppUser ici
from django.views.decorators.csrf import csrf_exempt
import json
from .models import postulation

@csrf_exempt
def recommend_jobs(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_email = data.get('email')  # Ensure you read JSON data correctly
            if user_email:
                try:
                    user = AppUser.objects.get(email=user_email)
                    user_domain = user.domain
                except AppUser.DoesNotExist:
                    return JsonResponse({'error': 'Domain not found for this user'}, status=400)

                if user_domain:
                    user_tfidf = vectorizer.transform([user_domain])
                    similarities = cosine_similarity(user_tfidf, tfidf_matrix)
                    similar_indices = similarities.argsort()[0][-100:][::-1]
                    recommendations = []
                    for index in similar_indices:
                        recommendation_data = {
                            'date': job_data.iloc[index]['date'],
                            'Title': job_data.iloc[index]['Title'],
                            'Company':job_data.iloc[index]['Company'],
                            'jobpost':job_data.iloc[index]['jobpost'],
                            'RequiredQual':job_data.iloc[index]['RequiredQual'],
                            'Location':job_data.iloc[index]['Location'],
                            
                        }
                        recommendations.append(recommendation_data)
                    return JsonResponse(recommendations, safe=False)
                else:
                    return JsonResponse({'error': 'Domain not found for this user'}, status=400)
            else:
                return JsonResponse({'error': 'Email not provided'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import postulation

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import postulation
import os
from django.conf import settings

@csrf_exempt
def apply_view(request):
    if request.method == 'POST':
        nom = request.POST.get('nom')
        prenom = request.POST.get('prenom')
        email = request.POST.get('email')
        telephone = request.POST.get('telephone')
        domaine = request.POST.get('domaine')
        cv = request.FILES.get('cv')
        lettre_motivation = request.FILES.get('lettre_motivation')

       
        application = postulation(
            nom=nom,
            prenom=prenom,
            email=email,
            telephone=telephone,
            domaine=domaine,
            cv=cv,
            lettre_motivation=lettre_motivation
        )
        application.save()
        return JsonResponse({'success': 'Application submitted successfully.'})

    return JsonResponse({'error': 'Invalid request method.'}, status=405)



@csrf_exempt
def add_to_favoris(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_email = data.get('email')
            job_data = data.get('job')

            if not user_email or not job_data:
                return JsonResponse({'error': 'Email and job data are required'}, status=400)

            try:
                user = AppUser.objects.get(email=user_email)
            except AppUser.DoesNotExist:
                return JsonResponse({'error': 'User not found'}, status=404)

            favoris = Favoris(
                jobpost=job_data['jobpost'],
                date=job_data['date'],
                title=job_data['Title'],
                company=job_data['Company'],
                
                location=job_data['Location'],
                
                required_qual=job_data['RequiredQual'],
                email=user_email  # Set the email field to the user's email
            )
            favoris.save()

            return JsonResponse({'success': 'Job added to favorites successfully.'}, status=201)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)




@csrf_exempt
def get_user_favoris(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_email = data.get('email')

            if not user_email:
                return JsonResponse({'error': 'Email is required'}, status=400)

            try:
                user = AppUser.objects.get(email=user_email)
            except AppUser.DoesNotExist:
                return JsonResponse({'error': 'User not found'}, status=404)

            favoris_list = Favoris.objects.filter(email=user_email)
            favoris_data = [
                {
                    'jobpost': fav.jobpost,
                    'date': fav.date,
                    'title': fav.title,
                    'company': fav.company,
                    'location': fav.location,
                    'required_qual': fav.required_qual,
                } for fav in favoris_list
            ]

            return JsonResponse(favoris_data, safe=False, status=200)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    
from django.contrib.auth.models import User   
from django.core.exceptions import ObjectDoesNotExist

@csrf_exempt
def update_profile(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_id = data.get('id', None)  # Récupérer l'ID de l'utilisateur
        email = data.get('email', None)  # Récupérer le nouvel email de l'utilisateur
         
        if not user_id:
            return JsonResponse({'error': 'User ID is required.'}, status=400)

        try:
            user = AppUser.objects.get(id=user_id)  # Récupérer l'utilisateur à partir de l'ID
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'User does not exist.'}, status=404)
        
        # Mettre à jour les données du profil de l'utilisateur
        user.email = email  # Mettre à jour l'email de l'utilisateur
        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)
        user.phone = data.get('phone', user.phone)
        user.domain = data.get('domain', user.domain)
        user.city = data.get('city', user.city)
        user.degree = data.get('degree', user.degree)
        user.description = data.get('description', user.description)
        user.image = data.get('image', user.image)
        user.cv = data.get('cv', user.cv)

        user.save()  # Sauvegarder les modifications

        return JsonResponse({'message': 'Profile updated successfully!', 'user_id': user.id})

    return JsonResponse({'error': 'Invalid request method.'}, status=400)

from .serializers import OffreSerializer
from rest_framework.decorators import api_view
from rest_framework.decorators import api_view, permission_classes

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def add_offer(request):
    if request.method == 'POST':
        try:
            serializer = OffreSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
############################################## Admin######################    
from .serializers import EmployerRegisterSerializer ,EmployerLoginSerializer,EmployerSerializer
class EmployerRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = EmployerRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmployerLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        serializer = EmployerLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            login(request, user)
            user_data = EmployerSerializer(user).data
            return Response(user_data,status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
   
from django.views.decorators.http import require_POST, require_GET, require_http_methods
@require_GET
def get_offers(request):
    email = request.GET.get('email')
    if not email:
        return JsonResponse({'error': 'Email parameter is required'}, status=400)
    
    offers = postulation.objects.filter(email=email)
    offers_list = list(offers.values('id', 'nom', 'prenom', 'email', 'telephone', 'domaine','date_postulation'))
    return JsonResponse(offers_list, safe=False)

from django.views.decorators.http import require_http_methods
@require_http_methods(["DELETE"])
@csrf_exempt 
def delete_offer(request, id):
    try:
        post = postulation.objects.get(id=id)
        post.delete()
        return JsonResponse({'success': 'Postulation deleted successfully'})
    except postulation.DoesNotExist:
        return JsonResponse({'error': 'Postulation not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
    
    
@csrf_exempt
def search(request):
    if request.method == 'GET':
        try:
            location = request.GET.get('location')  # Retrieve location from query parameters

            if location:
                recommendations = []

                for index in range(len(job_data)):
                    job_location = job_data.iloc[index]['Location']  # Assuming 'Location' is a column in job_data
                    
                    # Check if job_location is a string and not empty
                    if not isinstance(job_location, str) or not job_location.strip():
                        continue  # Skip if location is not a string or is empty
                    
                    # Case-insensitive comparison of locations
                    if job_location.lower() != location.lower():
                        continue  # Skip this job if location does not match

                    recommendation_data = {
                        'date': job_data.iloc[index]['date'],
                        'Title': job_data.iloc[index]['Title'],
                        'Company': job_data.iloc[index]['Company'],
                        'RequiredQual': job_data.iloc[index]['RequiredQual'],
                        'jobpost': job_data.iloc[index]['jobpost'],
                        'Location': job_data.iloc[index]['Location'],

                        'Location': job_location,
                    }
                    recommendations.append(recommendation_data)

                return JsonResponse(recommendations, safe=False)
            else:
                return JsonResponse({'error': 'Location not provided'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    
############################# Liste des offres pour Admin ##############################""
from .models import Offre    
    
from decimal import Decimal

@csrf_exempt
def offre_list(request):
    if request.method == 'GET':
        offres = Offre.objects.all()
        offres_data = [
            {
                'id': offre.id,
                'startDate': offre.startDate,
                'applicationDeadline': offre.applicationDeadline,
                'workMode': offre.workMode,
                'IT': offre.IT,  # Updated field name
                'jobTitle': offre.jobTitle,
                'companyName': offre.companyName,
                'companyAddress': offre.companyAddress,
                'companyEmail': offre.companyEmail,
                'salary': str(offre.salary) if offre.salary is not None else None,  # Convert Decimal to string
                'requiredDegree': offre.requiredDegree,
                'jobRequirement': offre.jobRequirement,
                'eligibility': offre.eligibility,
                'jobDescription': offre.jobDescription,
            } for offre in offres
        ]
        return JsonResponse(offres_data, safe=False)

    elif request.method == 'POST':
        try:
            data = json.loads(request.body)
            offre = Offre.objects.create(**data)
            return JsonResponse({'id': offre.id}, status=201)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except TypeError as e:
            return JsonResponse({'error': str(e)}, status=400)
        
@csrf_exempt
def delete_offre(request, offre_id):
    if request.method == 'DELETE':
        try:
            offre = Offre.objects.get(pk=offre_id)
            offre.delete()
            return HttpResponse(status=204)
        except Offre.DoesNotExist:
            return JsonResponse({'error': 'Offre not found'}, status=404)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    
    
############################# statistic #######################################"

import csv
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from .models import postulation

def count_data(request):
    # Compter les utilisateurs
    User = get_user_model()
    total_users = User.objects.count()
    
    # Compter les postulations
    total_postulations = postulation.objects.count()
    
    # Chemin vers le fichier CSV
    csv_file_path = 'D:/IID2/S2/Projet tuto/job_data.csv'  # Remplacez par le chemin réel de votre fichier CSV
    total_offers = 0
    
    # Lecture du fichier CSV et comptage des lignes
    try:
        with open(csv_file_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.reader(csvfile)
            # Ignorer l'en-tête si nécessaire
            next(reader, None)
            total_offers = sum(1 for row in reader)
    except FileNotFoundError:
        return JsonResponse({'error': 'CSV file not found'}, status=400)
    
    # Retourner les résultats en JSON
    return JsonResponse({
        'total_users': total_users,
        'total_postulations': total_postulations,
        'total_offers': total_offers
    })


#-------------------------Charts------------------------
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Count
from django.http import JsonResponse

@csrf_exempt
def offres_par_ville(request):
    if request.method == 'GET':
        # Define the cities to exclude
        excluded_cities = ["Yerevan, Armenia"]
        
        # Normalize city names to ensure consistent comparison
        job_data['Location'] = job_data['Location'].str.strip()
        
        # Exclude specific cities
        offres_groupes = job_data[~job_data['Location'].isin(excluded_cities)].groupby('Location').size().reset_index(name='nombre_offres')
        offres_groupes = offres_groupes.rename(columns={'Location': 'ville'})
        
        # Sort by 'nombre_offres' in descending order and select the top 10
        top_villes = offres_groupes.sort_values(by='nombre_offres', ascending=False).head(10)
        
        # Convert the result to a dictionary
        result = top_villes.to_dict(orient='records')
        return JsonResponse(result, safe=False)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
def offres_par_titre(request):
    if request.method == 'GET':
        # Filtrer les offres avec des titres non vides
        job_data_filtre = job_data.dropna(subset=['Title'])
        
        # Group by 'Title' and count the number of job offers
        offres_groupes = job_data_filtre.groupby('Title').size().reset_index(name='nombre_offres')
        
        # Sort by 'nombre_offres' in descending order
        offres_groupes = offres_groupes.sort_values(by='nombre_offres', ascending=False)
        
        # Select the top 10 titles with the most job offers
        top_10_titles = offres_groupes.head(10)
        
        # Convert the result to a dictionary
        result = top_10_titles.to_dict(orient='records')
        return JsonResponse(result, safe=False)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)




#-------------------------Number of users in Domaine-------------------------------
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def users_by_domain(request):
    if request.method == 'GET':
        # Group by 'domain' and count the number of users
        users_grouped = AppUser.objects.values('domain').annotate(nombre_users=Count('domain')).order_by('-nombre_users')

        # Convert the result to a list of dictionaries
        result = list(users_grouped)
        return JsonResponse(result, safe=False)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    
    
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Offre  # Assurez-vous d'importer le modèle Offre
from django.core.exceptions import ObjectDoesNotExist

import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Offre
from django.core.exceptions import ObjectDoesNotExist

@csrf_exempt
def update_offer1(request):
    if request.method == 'POST':
        try:
            # Assurez-vous que le corps de la requête n'est pas vide
            if not request.body:
                return JsonResponse({'error': 'Request body is empty.'}, status=400)

            data = json.loads(request.body)

            offer_id = data.get('id', None)
            if not offer_id:
                return JsonResponse({'error': 'Offer ID is required.'}, status=400)

            try:
                offer = Offre.objects.get(id=offer_id)
            except ObjectDoesNotExist:
                return JsonResponse({'error': 'Offer does not exist.'}, status=404)

            # Mettre à jour les données de l'offre
            offer.jobTitle = data.get('jobTitle', offer.jobTitle)
            offer.companyName = data.get('companyName', offer.companyName)
            offer.companyAddress = data.get('companyAddress', offer.companyAddress)
            offer.companyEmail = data.get('companyEmail', offer.companyEmail)
            offer.salary = data.get('salary', offer.salary)
            offer.requiredDegree = data.get('requiredDegree', offer.requiredDegree)
            offer.jobRequirement = data.get('jobRequirement', offer.jobRequirement)
            offer.eligibility = data.get('eligibility', offer.eligibility)
            offer.jobDescription = data.get('jobDescription', offer.jobDescription)
            offer.startDate = data.get('startDate', offer.startDate)
            offer.applicationDeadline = data.get('applicationDeadline', offer.applicationDeadline)
            offer.workMode = data.get('workMode', offer.workMode)
            offer.IT = data.get('IT', offer.IT)

            offer.save()  # Sauvegarder les modifications

            return JsonResponse({'message': 'Offer updated successfully!', 'offer_id': offer.id})

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON.'}, status=400)

    return JsonResponse({'error': 'Invalid request method.'}, status=400)