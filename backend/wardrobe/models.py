from django.db import models
from django.utils.text import slugify
import uuid

CATEGORY_CHOICES = (
    ('tops', 'Tops'),
    ('bottoms', 'Bottoms'),
    ('shoes', 'Shoes'),
    ('accessories', 'Accessories'),
)

class ClothingItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    image = models.ImageField(upload_to='clothing_items/')
    color = models.CharField(max_length=50, blank=True)
    brand = models.CharField(max_length=100, blank=True)
    favorite = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name

class Outfit(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    top = models.ForeignKey(ClothingItem, related_name='outfit_tops', on_delete=models.SET_NULL, null=True, blank=True)
    bottom = models.ForeignKey(ClothingItem, related_name='outfit_bottoms', on_delete=models.SET_NULL, null=True, blank=True)
    shoes = models.ForeignKey(ClothingItem, related_name='outfit_shoes', on_delete=models.SET_NULL, null=True, blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name

class OutfitAccessory(models.Model):
    outfit = models.ForeignKey(Outfit, related_name='accessories', on_delete=models.CASCADE)
    accessory = models.ForeignKey(ClothingItem, on_delete=models.CASCADE)
    
    class Meta:
        unique_together = ('outfit', 'accessory')
        verbose_name_plural = 'Outfit accessories'
    
    def __str__(self):
        return f"{self.outfit.name} - {self.accessory.name}"
