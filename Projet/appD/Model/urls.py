from django.urls import path
from . import views


urlpatterns = [
	path('register', views.UserRegister.as_view(), name='register'),
	path('login', views.UserLogin.as_view(), name='login'),
	path('logout', views.UserLogout.as_view(), name='logout'),
	path('user', views.UserView.as_view(), name='user'),
    path('recommendation/', views.recommend_jobs, name='recommendation'),
   path('apply',views.apply_view,name='apply'),
   path('add_to_favoris/', views.add_to_favoris, name='add_to_favoris'),
   path('user_favoris/', views.get_user_favoris, name='get_user_favoris'),
   path('update-profile/', views.update_profile, name='update-profile'),
   path('offres_add/', views.add_offer, name='add-offer'),
   path('register1', views.EmployerRegister.as_view(), name='employer_register'),
  path('login1', views.EmployerLogin.as_view(), name='employer_login'),
  path('offers',views.get_offers,name='offers'),
  path('delete_offer/<str:id>/', views.delete_offer, name='delete_offer'),
  path('search',views.search,name='search'),
  path('offres/', views.offre_list,name='offres'),
  path('delete_offre/<str:offre_id>/', views.delete_offre),
  path('count-data/', views.count_data, name='count_data'),
  path('offerville', views.offres_par_ville, name='update-profile'),
    path('offertitle',views.offres_par_titre,name='offres_par_ville'),
  path('usersbydomain', views.users_by_domain, name='users_by_domain'),
  path('update_offre', views.update_offer1, name='update_offre'),
   
  ]