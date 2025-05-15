from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'recipes', views.RecipeViewSet)
router.register(r'favorites', views.FavoriteViewSet, basename='favorite')

recipes_router = routers.NestedDefaultRouter(router, r'recipes', lookup='recipe')
recipes_router.register(r'comments', views.CommentViewSet, basename='recipe-comments')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(recipes_router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('auth/signup/', views.signup, name='signup'),
    path('auth/login/', views.login_view, name='login'),
    path('auth/logout/', views.logout_view, name='logout'),
    path('auth/user/', views.user_view, name='user'),
] 