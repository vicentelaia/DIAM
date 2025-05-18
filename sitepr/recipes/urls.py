from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import CommentListCreateView

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'recipes', views.RecipeViewSet)
router.register(r'comments', views.CommentViewSet)
router.register(r'favorites', views.FavoriteViewSet, basename='favorite')

urlpatterns = [
    path('', include(router.urls)),

    # Auth
    path('auth/signup/', views.signup, name='signup'),
    path('auth/login/', views.login_view, name='login'),
    path('auth/logout/', views.logout_view, name='logout'),
    path('auth/user/', views.user_view, name='user'),

    # Comentários específicos de uma receita
    path('recipes/<int:pk>/comments/', CommentListCreateView.as_view(), name='recipe-comments'),
]
