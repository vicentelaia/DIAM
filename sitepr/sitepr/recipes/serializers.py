from rest_framework import serializers
from .models import User, Recipe, Comment, Favorite

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'avatar', 'bio', 'is_admin')
        read_only_fields = ('id', 'is_admin')

    def validate_avatar(self, value):
        if value:
            # Check file size (max 5MB)
            if value.size > 5 * 1024 * 1024:
                raise serializers.ValidationError("Image file too large ( > 5MB )")
            
            # Check file type
            allowed_types = ['image/jpeg', 'image/png', 'image/jpg']
            if value.content_type not in allowed_types:
                raise serializers.ValidationError("Invalid image format. Only JPEG and PNG are allowed.")
            
        return value

class RecipeSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    is_favorited = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = ('id', 'title', 'description', 'ingredients', 'instructions', 'image',
                 'category', 'author', 'created_at', 'updated_at', 'likes_count',
                 'comments_count', 'is_liked', 'is_favorited', 'is_featured')
        read_only_fields = ('author', 'created_at', 'updated_at', 'is_featured')

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
            return obj.favorited_by.filter(user=request.user).exists()
        return False

class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'recipe', 'author', 'content', 'created_at', 'updated_at')
        read_only_fields = ('author', 'created_at', 'updated_at')

class FavoriteSerializer(serializers.ModelSerializer):
    recipe = RecipeSerializer(read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Favorite
        fields = ('id', 'recipe', 'user', 'created_at')
        read_only_fields = ('user', 'created_at')
