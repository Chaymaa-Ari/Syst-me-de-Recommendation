from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)
    
    class Meta:
        model = UserModel
        fields = [
            'email', 'password', 'first_name', 'last_name', 'phone', 'sex', 
            'city', 'domain', 'degree', 'description', 'image', 'cv', 'confirm_password'
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = UserModel.objects.create_user(**validated_data)
        return user

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")
        if email and password:
            user = authenticate(username=email, password=password)
            if user:
                data["user"] = user
            else:
                raise serializers.ValidationError("Invalid email or password")
        else:
            raise serializers.ValidationError("Must include both email and password")
        return data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['id',
            'email', 'first_name', 'last_name', 'phone', 'sex', 
            'city', 'domain', 'degree', 'description', 'image', 'cv'
        ]

from .models import Offre
class OffreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offre
        fields = ['id','startDate' ,'applicationDeadline' , 'workMode' , 'IT' , 'jobTitle' , 'companyName',
                  'companyAddress' , 'companyEmail' , 'salary' , 'requiredDegree' , 'jobRequirement',
                  'eligibility' , 'jobDescription' ]
        
        
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate

# Assuming UserModel is set to Employer model
UserModel = get_user_model()

class EmployerRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = [
            'email', 'password', 'first_name', 'last_name','password'
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = UserModel.objects.create_user(**validated_data)
        return user

class EmployerLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")
        if email and password:
            user = authenticate(username=email, password=password)
            if user:
                data["user"] = user
            else:
                raise serializers.ValidationError("Invalid email or password")
        else:
            raise serializers.ValidationError("Must include both email and password")
        return data

class EmployerSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['id', 'email', 'first_name', 'last_name']
