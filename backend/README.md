# OutfitMatch Backend

This is the Django backend for the OutfitMatch application.

## Setup

1. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Run migrations:
   ```
   python manage.py migrate
   ```

3. Create a superuser (optional):
   ```
   python manage.py createsuperuser
   ```

4. Start the development server:
   ```
   python manage.py runserver
   ```

## API Endpoints

### Clothing Items
- `GET /api/clothing-items/` - List all clothing items
- `POST /api/clothing-items/` - Create a new clothing item
- `GET /api/clothing-items/{id}/` - Retrieve a specific clothing item
- `PATCH /api/clothing-items/{id}/` - Update a clothing item
- `DELETE /api/clothing-items/{id}/` - Delete a clothing item
- `POST /api/clothing-items/{id}/toggle_favorite/` - Toggle favorite status

### Outfits
- `GET /api/outfits/` - List all outfits
- `POST /api/outfits/` - Create a new outfit
- `GET /api/outfits/{id}/` - Retrieve a specific outfit
- `PATCH /api/outfits/{id}/` - Update an outfit
- `DELETE /api/outfits/{id}/` - Delete an outfit
- `POST /api/outfits/generate_suggestions/` - Generate outfit suggestions
- `POST /api/outfits/generate_from_items/` - Generate outfit from selected items

## Models

### ClothingItem
- id (UUID)
- name (string)
- category (string: tops, bottoms, shoes, accessories)
- image (file)
- color (string, optional)
- brand (string, optional)
- favorite (boolean)

### Outfit
- id (UUID)
- name (string)
- top (foreign key to ClothingItem)
- bottom (foreign key to ClothingItem)
- shoes (foreign key to ClothingItem)
- rating (decimal)

### OutfitAccessory
- outfit (foreign key to Outfit)
- accessory (foreign key to ClothingItem)
