from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.db.models import Q
import random

from .models import ClothingItem, Outfit, OutfitAccessory, CATEGORY_CHOICES
from .serializers import ClothingItemSerializer, OutfitSerializer

class ClothingItemViewSet(viewsets.ModelViewSet):
    queryset = ClothingItem.objects.all()
    serializer_class = ClothingItemSerializer
    parser_classes = (MultiPartParser, FormParser)
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'brand', 'color']
    ordering_fields = ['name', 'created_at', 'category']
    
    def get_queryset(self):
        queryset = ClothingItem.objects.all()
        category = self.request.query_params.get('category', None)
        favorite = self.request.query_params.get('favorite', None)
        
        if category:
            queryset = queryset.filter(category=category)
        
        if favorite and favorite.lower() == 'true':
            queryset = queryset.filter(favorite=True)
            
        return queryset
    
    @action(detail=True, methods=['post'])
    def toggle_favorite(self, request, pk=None):
        item = self.get_object()
        item.favorite = not item.favorite
        item.save()
        return Response({'status': 'favorite toggled', 'favorite': item.favorite})

class OutfitViewSet(viewsets.ModelViewSet):
    queryset = Outfit.objects.all()
    serializer_class = OutfitSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['name', 'created_at', 'rating']
    
    @action(detail=False, methods=['post'])
    def generate_suggestions(self, request):
        # Get items by category
        tops = list(ClothingItem.objects.filter(category='tops'))
        bottoms = list(ClothingItem.objects.filter(category='bottoms'))
        shoes = list(ClothingItem.objects.filter(category='shoes'))
        accessories = list(ClothingItem.objects.filter(category='accessories'))
        
        # Check if we have enough items to generate outfits
        if not (tops and bottoms and shoes):
            return Response(
                {'error': 'Not enough clothing items to generate outfits'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Generate 3 random outfits
        outfits = []
        outfit_styles = ["Casual", "Business", "Weekend", "Summer", "Winter", "Fall", "Spring"]
        outfit_types = ["Look", "Style", "Outfit", "Ensemble", "Attire"]
        
        for i in range(3):
            # Randomly select items
            top = random.choice(tops)
            bottom = random.choice(bottoms)
            shoe = random.choice(shoes)
            
            # Generate a random outfit name
            style = random.choice(outfit_styles)
            outfit_type = random.choice(outfit_types)
            name = f"{style} {outfit_type}"
            
            # Generate a random rating between 3.5 and 5.0
            rating = round(3.5 + random.random() * 1.5, 1)
            
            # Create the outfit
            outfit = Outfit.objects.create(
                name=name,
                top=top,
                bottom=bottom,
                shoes=shoe,
                rating=rating
            )
            
            # Randomly add accessories (0-2)
            if accessories and random.random() > 0.3:
                num_accessories = min(len(accessories), random.randint(1, 2))
                selected_accessories = random.sample(accessories, num_accessories)
                
                for accessory in selected_accessories:
                    OutfitAccessory.objects.create(outfit=outfit, accessory=accessory)
            
            outfits.append(outfit)
        
        # Serialize and return the generated outfits
        serializer = OutfitSerializer(outfits, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'])
    def generate_from_items(self, request):
        item_ids = request.data.get('item_ids', [])
        
        if not item_ids:
            return Response(
                {'error': 'No items provided'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get the selected items
        selected_items = ClothingItem.objects.filter(id__in=item_ids)
        
        # Categorize the items
        tops = [item for item in selected_items if item.category == 'tops']
        bottoms = [item for item in selected_items if item.category == 'bottoms']
        shoes = [item for item in selected_items if item.category == 'shoes']
        accessories = [item for item in selected_items if item.category == 'accessories']
        
        # Fill in missing categories from the general wardrobe
        if not tops:
            tops = list(ClothingItem.objects.filter(category='tops'))
        if not bottoms:
            bottoms = list(ClothingItem.objects.filter(category='bottoms'))
        if not shoes:
            shoes = list(ClothingItem.objects.filter(category='shoes'))
        if not accessories:
            accessories = list(ClothingItem.objects.filter(category='accessories'))
        
        # Check if we have enough items to generate outfits
        if not (tops and bottoms and shoes):
            return Response(
                {'error': 'Not enough clothing items to generate outfits'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Generate outfit
        outfit_styles = ["Casual", "Business", "Weekend", "Summer", "Winter", "Fall", "Spring"]
        outfit_types = ["Look", "Style", "Outfit", "Ensemble", "Attire"]
        
        # Randomly select items, prioritizing selected items
        top = random.choice(tops)
        bottom = random.choice(bottoms)
        shoe = random.choice(shoes)
        
        # Generate a random outfit name
        style = random.choice(outfit_styles)
        outfit_type = random.choice(outfit_types)
        name = f"{style} {outfit_type} with Selected Items"
        
        # Generate a random rating between 3.5 and 5.0
        rating = round(3.5 + random.random() * 1.5, 1)
        
        # Create the outfit
        outfit = Outfit.objects.create(
            name=name,
            top=top,
            bottom=bottom,
            shoes=shoe,
            rating=rating
        )
        
        # Add accessories (up to 2)
        if accessories:
            num_accessories = min(len(accessories), 2)
            selected_accessories = random.sample(accessories, num_accessories)
            
            for accessory in selected_accessories:
                OutfitAccessory.objects.create(outfit=outfit, accessory=accessory)
        
        # Serialize and return the generated outfit
        serializer = OutfitSerializer(outfit, context={'request': request})
        return Response(serializer.data)
