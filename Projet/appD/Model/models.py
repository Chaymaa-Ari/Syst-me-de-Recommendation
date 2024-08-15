from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from djongo import models as djongo_models
from bson import ObjectId
class AppUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')

        return self.create_user(email, password, **extra_fields)

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.models import Group, Permission

class AppUser(AbstractBaseUser, PermissionsMixin):
    _id = djongo_models.ObjectIdField(primary_key=True)
    id = models.CharField(max_length=24, primary_key=False, default=lambda: str(ObjectId()), editable=False, unique=True)
    email = models.EmailField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50, null=True, blank=True)
    phone = models.CharField(max_length=15, null=True, blank=True)
    sex = models.CharField(max_length=10, null=True, blank=True)
    city = models.CharField(max_length=50, null=True, blank=True)
    domain = models.CharField(max_length=100, null=True, blank=True)
    degree = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    cv = models.FileField(upload_to='cvs/', null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = AppUserManager()
    
    
    
    groups = models.ManyToManyField(
        Group,
        verbose_name=('groups'),
        blank=True,
        related_name='appuser_groups'  # Custom related_name for AppUser
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=('user permissions'),
        blank=True,
        related_name='appuser_user_permissions'  # Custom related_name for AppUser
    )

    def __str__(self):
        return self.email



class postulation(models.Model):
    id = models.CharField(max_length=24, primary_key=True, default=lambda: str(ObjectId()), editable=False)
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    email = models.EmailField()
    telephone = models.CharField(max_length=20)
    domaine = models.CharField(max_length=100)  # Added domaine field
    cv = models.FileField(upload_to='cv/')
    lettre_motivation = models.FileField(upload_to='lettre_motivation/')
    date_postulation = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return f'{self.prenom} {self.nom} - {self.email}'


class Favoris(models.Model):
    jobpost = models.CharField(max_length=255)
    date = models.CharField(max_length=255)
    title = models.CharField(max_length=6000)
    company = models.CharField(max_length=6000)
    location = models.CharField(max_length=6000)
    job_description = models.TextField()
    required_qual = models.TextField()
   
    email = models.EmailField()

    def __str__(self):
        return f'{self.title} at {self.company}'
    
    

class Offre(models.Model):
    id = models.CharField(max_length=24, primary_key=True, default=lambda: str(ObjectId()), editable=False)
    startDate = models.DateField()
    applicationDeadline = models.DateField()
    workMode = models.CharField(max_length=50)
    IT = models.BooleanField()  # Renamed from IT to it_domain for clarity
    jobTitle = models.CharField(max_length=100)
    companyName = models.CharField(max_length=100)
    companyAddress = models.CharField(max_length=255)
    companyEmail = models.EmailField()
    salary = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    requiredDegree = models.CharField(max_length=100)
    jobRequirement = models.TextField(null=True, blank=True)
    eligibility = models.TextField(null=True, blank=True)
    jobDescription = models.TextField(null=True, blank=True)

    def _str_(self):
        return self.jobTitle
    
    
from djongo import models as djongo_models
from bson import ObjectId
class EmployerManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')

        return self.create_user(email, password, **extra_fields)


class Employer(AbstractBaseUser, PermissionsMixin):
    _id = djongo_models.ObjectIdField(primary_key=True)
    id = models.CharField(max_length=24, primary_key=False, default=lambda: str(ObjectId()), editable=False, unique=True)
    email = models.EmailField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50, null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = EmployerManager()
    
    groups = models.ManyToManyField(
        Group,
        verbose_name=('groups'),
        blank=True,
        related_name='employer_groups'  # Custom related_name for Employer
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=('user permissions'),
        blank=True,
        related_name='employer_user_permissions'  # Custom related_name for Employer
    )

    def __str__(self):
        return self.email
