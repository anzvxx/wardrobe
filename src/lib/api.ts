// API service for communicating with the Django backend

const API_URL = "http://localhost:8000/api";

// Helper function for handling API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: "An unknown error occurred",
    }));
    throw new Error(error.message || "An unknown error occurred");
  }
  return response.json();
};

// Clothing Item API calls
export const clothingItemApi = {
  // Get all clothing items
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams(params as Record<string, string>);
    const response = await fetch(`${API_URL}/clothing-items/?${queryParams}`);
    return handleResponse(response);
  },

  // Get a single clothing item by ID
  getById: async (id: string) => {
    const response = await fetch(`${API_URL}/clothing-items/${id}/`);
    return handleResponse(response);
  },

  // Create a new clothing item
  create: async (data: FormData) => {
    const response = await fetch(`${API_URL}/clothing-items/`, {
      method: "POST",
      body: data,
    });
    return handleResponse(response);
  },

  // Update a clothing item
  update: async (id: string, data: FormData) => {
    const response = await fetch(`${API_URL}/clothing-items/${id}/`, {
      method: "PATCH",
      body: data,
    });
    return handleResponse(response);
  },

  // Delete a clothing item
  delete: async (id: string) => {
    const response = await fetch(`${API_URL}/clothing-items/${id}/`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete item");
    }
    return true;
  },

  // Toggle favorite status
  toggleFavorite: async (id: string) => {
    const response = await fetch(
      `${API_URL}/clothing-items/${id}/toggle_favorite/`,
      {
        method: "POST",
      },
    );
    return handleResponse(response);
  },
};

// Outfit API calls
export const outfitApi = {
  // Get all outfits
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams(params as Record<string, string>);
    const response = await fetch(`${API_URL}/outfits/?${queryParams}`);
    return handleResponse(response);
  },

  // Get a single outfit by ID
  getById: async (id: string) => {
    const response = await fetch(`${API_URL}/outfits/${id}/`);
    return handleResponse(response);
  },

  // Create a new outfit
  create: async (data: any) => {
    const response = await fetch(`${API_URL}/outfits/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  // Update an outfit
  update: async (id: string, data: any) => {
    const response = await fetch(`${API_URL}/outfits/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  // Delete an outfit
  delete: async (id: string) => {
    const response = await fetch(`${API_URL}/outfits/${id}/`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete outfit");
    }
    return true;
  },

  // Generate outfit suggestions
  generateSuggestions: async () => {
    const response = await fetch(`${API_URL}/outfits/generate_suggestions/`, {
      method: "POST",
    });
    return handleResponse(response);
  },

  // Generate outfit from selected items
  generateFromItems: async (itemIds: string[]) => {
    const response = await fetch(`${API_URL}/outfits/generate_from_items/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item_ids: itemIds }),
    });
    return handleResponse(response);
  },
};
