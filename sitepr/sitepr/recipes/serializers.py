from rest_framework import serializers
from .models import User, Recipe, Comment, Favorite

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
<<<<<<< HEAD
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'avatar', 'bio', 'is_admin')
        read_only_fields = ('id', 'is_admin')
=======
        fields = ('id', 'username', 'email', 'is_admin', 'avatar', 'bio')
        read_only_fields = ('is_admin',)
>>>>>>> b13e957 (Frotend atualizado)

class RecipeSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    is_favorited = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
<<<<<<< HEAD
        fields = ('id', 'title', 'description', 'ingredients', 'instructions', 'image',
                 'category', 'author', 'created_at', 'updated_at', 'likes_count',
                 'comments_count', 'is_liked', 'is_favorited', 'is_featured')
        read_only_fields = ('author', 'created_at', 'updated_at')
=======
        fields = ('id', 'title', 'description', 'ingredients', 'instructions', 
                 'image', 'category', 'author', 'created_at', 'updated_at',
                 'likes_count', 'comments_count', 'is_liked', 'is_favorited',
                 'is_featured')
        read_only_fields = ('author', 'created_at', 'updated_at', 'is_featured')
>>>>>>> b13e957 (Frotend atualizado)

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_comments_count(self, obj):
        return obj.comments.count()

    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.likes.filter(id=request.user.id).exists()
        return False

    def get_is_favorited(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
<<<<<<< HEAD
            return obj.favorited_by.filter(user=request.user).exists()
=======
            return obj.favorited_by.filter(id=request.user.id).exists()
>>>>>>> b13e957 (Frotend atualizado)
        return False

class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'recipe', 'author', 'content', 'created_at', 'updated_at')
        read_only_fields = ('author', 'created_at', 'updated_at')

class FavoriteSerializer(serializers.ModelSerializer):
    recipe = RecipeSerializer(read_only=True)
<<<<<<< HEAD
    user = UserSerializer(read_only=True)

    class Meta:
        model = Favorite
        fields = ('id', 'recipe', 'user', 'created_at')
        read_only_fields = ('user', 'created_at') 
=======

    class Meta:
        model = Favorite
        fields = ('id', 'recipe', 'created_at')
        read_only_fields = ('created_at',) 
>>>>>>> b13e957 (Frotend atualizado)
