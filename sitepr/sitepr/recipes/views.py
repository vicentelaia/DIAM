from rest_framework import viewsets, permissions, status, filters
<<<<<<< HEAD
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
=======
from rest_framework.decorators import action
from rest_framework.response import Response
>>>>>>> b13e957 (Frotend atualizado)
from django.shortcuts import get_object_or_404
from .models import User, Recipe, Comment, Favorite
from .serializers import UserSerializer, RecipeSerializer, CommentSerializer, FavoriteSerializer
from .permissions import IsAdminOrReadOnly, IsAuthorOrReadOnly
<<<<<<< HEAD
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.http import JsonResponse
import json
from rest_framework.authtoken.models import Token

@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if username is None or password is None:
        return Response({'error': 'invalid username/password'}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = User.objects.create_user(username=username, password=password)
    return Response({'message': 'User ' + user.username + ' created successfully'}, status=status.HTTP_201_CREATED)

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    print(f"Login attempt for user: {username}")  # Debug log
    
    if not username or not password:
        return Response({'message': 'Please provide both username and password'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = authenticate(username=username, password=password)
    if user:
        # Create or get token
        token, _ = Token.objects.get_or_create(user=user)
        login(request, user)
        
        # Return just the token
        return Response({
            'token': token.key
        })
    else:
        print(f"Login failed for user: {username}")  # Debug log
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    logout(request)
    return Response({'message': 'Logout successful'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_view(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)
=======
>>>>>>> b13e957 (Frotend atualizado)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action in ['create']:
            return [permissions.AllowAny()]
        return super().get_permissions()

    def get_queryset(self):
        if self.request.user.is_admin:
            return User.objects.all()
        return User.objects.filter(id=self.request.user.id)

<<<<<<< HEAD
    @action(detail=False, methods=['get'])
    def profile(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
=======
class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthorOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'ingredients']
    ordering_fields = ['created_at', 'likes_count', 'comments_count']
>>>>>>> b13e957 (Frotend atualizado)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        recipe = self.get_object()
        if recipe.likes.filter(id=request.user.id).exists():
            recipe.likes.remove(request.user)
            return Response({'status': 'unliked'})
        recipe.likes.add(request.user)
        return Response({'status': 'liked'})

    @action(detail=True, methods=['post'])
    def favorite(self, request, pk=None):
        recipe = self.get_object()
<<<<<<< HEAD
        favorite, created = Favorite.objects.get_or_create(user=request.user, recipe=recipe)
=======
        favorite, created = Favorite.objects.get_or_create(
            user=request.user,
            recipe=recipe
        )
>>>>>>> b13e957 (Frotend atualizado)
        if not created:
            favorite.delete()
            return Response({'status': 'unfavorited'})
        return Response({'status': 'favorited'})

<<<<<<< HEAD
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def perform_create(self, serializer):
        recipe = get_object_or_404(Recipe, pk=self.kwargs['recipe_pk'])
        serializer.save(author=self.request.user, recipe=recipe)

    def get_queryset(self):
        return Comment.objects.filter(recipe_id=self.kwargs['recipe_pk'])
=======
    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured_recipes = Recipe.objects.filter(is_featured=True)
        serializer = self.get_serializer(featured_recipes, many=True)
        return Response(serializer.data)

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthorOrReadOnly]

    def get_queryset(self):
        recipe_id = self.kwargs.get('recipe_pk')
        return Comment.objects.filter(recipe_id=recipe_id)

    def perform_create(self, serializer):
        recipe_id = self.kwargs.get('recipe_pk')
        recipe = get_object_or_404(Recipe, id=recipe_id)
        serializer.save(author=self.request.user, recipe=recipe)
>>>>>>> b13e957 (Frotend atualizado)

class FavoriteViewSet(viewsets.ModelViewSet):
    serializer_class = FavoriteSerializer
    permission_classes = [permissions.IsAuthenticated]
<<<<<<< HEAD
    queryset = Favorite.objects.all()
=======
>>>>>>> b13e957 (Frotend atualizado)

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
<<<<<<< HEAD
        serializer.save(user=self.request.user)
=======
        serializer.save(user=self.request.user) 
>>>>>>> b13e957 (Frotend atualizado)
