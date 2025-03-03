from django.contrib import admin
from .models import ClothingItem, Outfit, OutfitAccessory

class OutfitAccessoryInline(admin.TabularInline):
    model = OutfitAccessory
    extra = 1

@admin.register(ClothingItem)
class ClothingItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'color', 'brand', 'favorite')
    list_filter = ('category', 'favorite', 'brand')
    search_fields = ('name', 'color', 'brand')

@admin.register(Outfit)
class OutfitAdmin(admin.ModelAdmin):
    list_display = ('name', 'top', 'bottom', 'shoes', 'rating')
    list_filter = ('rating',)
    search_fields = ('name',)
    inlines = [OutfitAccessoryInline]
