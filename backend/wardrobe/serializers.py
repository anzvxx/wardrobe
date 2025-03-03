from rest_framework import serializers
from .models import ClothingItem, Outfit, OutfitAccessory

class ClothingItemSerializer(serializers.ModelSerializer):
    imageUrl = serializers.SerializerMethodField()
    
    class Meta:
        model = ClothingItem
        fields = ['id', 'name', 'category', 'imageUrl', 'color', 'brand', 'favorite']
    
    def get_imageUrl(self, obj):
        if obj.image:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.image.url)
        return None

class OutfitAccessorySerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='accessory.id')
    name = serializers.CharField(source='accessory.name')
    category = serializers.CharField(source='accessory.category')
    imageUrl = serializers.SerializerMethodField()
    
    class Meta:
        model = OutfitAccessory
        fields = ['id', 'name', 'category', 'imageUrl']
    
    def get_imageUrl(self, obj):
        if obj.accessory.image:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.accessory.image.url)
        return None

class OutfitSerializer(serializers.ModelSerializer):
    top = ClothingItemSerializer(read_only=True)
    bottom = ClothingItemSerializer(read_only=True)
    shoes = ClothingItemSerializer(read_only=True)
    accessories = OutfitAccessorySerializer(many=True, read_only=True)
    
    top_id = serializers.UUIDField(write_only=True, required=False, allow_null=True)
    bottom_id = serializers.UUIDField(write_only=True, required=False, allow_null=True)
    shoes_id = serializers.UUIDField(write_only=True, required=False, allow_null=True)
    accessory_ids = serializers.ListField(child=serializers.UUIDField(), write_only=True, required=False)
    
    class Meta:
        model = Outfit
        fields = ['id', 'name', 'top', 'bottom', 'shoes', 'accessories', 'rating', 
                  'top_id', 'bottom_id', 'shoes_id', 'accessory_ids']
    
    def create(self, validated_data):
        accessory_ids = validated_data.pop('accessory_ids', [])
        top_id = validated_data.pop('top_id', None)
        bottom_id = validated_data.pop('bottom_id', None)
        shoes_id = validated_data.pop('shoes_id', None)
        
        if top_id:
            validated_data['top_id'] = top_id
        if bottom_id:
            validated_data['bottom_id'] = bottom_id
        if shoes_id:
            validated_data['shoes_id'] = shoes_id
            
        outfit = Outfit.objects.create(**validated_data)
        
        # Add accessories
        for accessory_id in accessory_ids:
            try:
                accessory = ClothingItem.objects.get(id=accessory_id, category='accessories')
                OutfitAccessory.objects.create(outfit=outfit, accessory=accessory)
            except ClothingItem.DoesNotExist:
                pass
        
        return outfit
    
    def update(self, instance, validated_data):
        accessory_ids = validated_data.pop('accessory_ids', None)
        
        # Update top, bottom, shoes if provided
        if 'top_id' in validated_data:
            instance.top_id = validated_data.pop('top_id')
        if 'bottom_id' in validated_data:
            instance.bottom_id = validated_data.pop('bottom_id')
        if 'shoes_id' in validated_data:
            instance.shoes_id = validated_data.pop('shoes_id')
        
        # Update other fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Update accessories if provided
        if accessory_ids is not None:
            # Clear existing accessories
            instance.accessories.all().delete()
            
            # Add new accessories
            for accessory_id in accessory_ids:
                try:
                    accessory = ClothingItem.objects.get(id=accessory_id, category='accessories')
                    OutfitAccessory.objects.create(outfit=instance, accessory=accessory)
                except ClothingItem.DoesNotExist:
                    pass
        
        return instance
