from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClothingItemViewSet, OutfitViewSet

router = DefaultRouter()
router.register(r'clothing-items', ClothingItemViewSet)
router.register(r'outfits', OutfitViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
