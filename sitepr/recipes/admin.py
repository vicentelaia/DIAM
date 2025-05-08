from django.contrib import admin
from .models import User, Recipe, Comment, Favorite

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_admin')
    list_filter = ('is_admin',)
    search_fields = ('username', 'email', 'first_name', 'last_name')

@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'category', 'created_at', 'is_featured')
    list_filter = ('category', 'is_featured', 'created_at')
    search_fields = ('title', 'description', 'ingredients')
    date_hierarchy = 'created_at'

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('author', 'recipe', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('content', 'author__username', 'recipe__title')
    date_hierarchy = 'created_at'

@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ('user', 'recipe', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('user__username', 'recipe__title')
    date_hierarchy = 'created_at' 