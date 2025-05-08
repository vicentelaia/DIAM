from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'recipes', views.RecipeViewSet)
router.register(r'favorites', views.FavoriteViewSet, basename='favorite')

urlpatterns = [
    path('', include(router.urls)),
    path('recipes/<int:recipe_pk>/comments/', views.CommentViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('recipes/<int:recipe_pk>/comments/<int:pk>/', views.CommentViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'patch': 'partial_update',
        'delete': 'destroy'
    })),
] 