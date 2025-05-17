from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils import timezone

# === Custom User Manager ===
class UserManager(BaseUserManager):
    def create_user(self, username, email=None, password=None, **extra_fields):
        if not username:
            raise ValueError("O nome de usuário é obrigatório")
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_admin', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superusuário precisa de is_staff=True")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Superusuário precisa de is_superuser=True")

        return self.create_user(username, email, password, **extra_fields)

# === Custom User ===
class User(AbstractUser):
    is_admin = models.BooleanField(default=False)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    bio = models.TextField(max_length=500, blank=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    date_of_birth = models.DateField(null=True, blank=True)
    address = models.TextField(max_length=200, blank=True)

    objects = UserManager()  # ← Adiciona o manager customizado

# === Recipe Model ===
class Recipe(models.Model):
    CATEGORY_CHOICES = [
        ('cafe-da-manha', 'Café da Manhã'),
        ('almoco', 'Almoço'),
        ('jantar', 'Jantar'),
        ('lanche', 'Lanche'),
        ('sobremesa', 'Sobremesa'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    ingredients = models.TextField()
    instructions = models.TextField()
    image = models.ImageField(upload_to='recipes/')
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recipes')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    likes = models.ManyToManyField(User, related_name='liked_recipes', blank=True)
    is_featured = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']

# === Comment Model ===
class Comment(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Comment by {self.author.username} on {self.recipe.title}'

    class Meta:
        ordering = ['-created_at']

# === Favorite Model ===
class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='favorited_by')
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ('user', 'recipe')
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.user.username} favorited {self.recipe.title}'
