import apiClient from "@/config/config.js";

// Creat New Order
export const createInventoryItem = async (formData) => {
  try {
    await apiClient.post("/inventory", formData);
    console.log("item added to inventory", formData);
  } catch (error) {
    console.log("Failed adding items", error);
  }
};

// get all Inventory
export const getInventoryItems = async () => {
  try {
    const response = await apiClient.get("/inventory");

    // console.log("items Fetched", response);
    const data = response.data;
    return data;
  } catch (error) {
    console.log("Failed adding items", error);
  }
};

// update Inventory Item
export const updateInventoryItem = async (id, updatedData) => {
  try {
    if (!id) {
      console.error("Item ID is required");
      return;
    }
    if (!updatedData || Object.keys(updatedData).length === 0) {
      console.error("Updated data is required");
      return;
    }

    console.log(`Updating item with ID: ${id}`, updatedData);

    await apiClient.put(`/inventory/${id}`, updatedData); // Remove extra wrapping
  } catch (error) {
    console.error("Failed to update item:", error);
  }
};
export const getItemById = async (id) => {
  try {
    if (!id) {
      return;
    }
    const response = await apiClient.get(`/inventory/${id}`);
    console.log("item Fetched", response);

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        `Error: Received ${error.response.status} response from server.`,
        {
          status: error.response.status,
          data: error.response.data,
        }
      );
    } else if (error.request) {
      console.error("Error: No response received from server.", {
        request: error.request,
      });
    } else {
      console.error(
        "Error: An unexpected error occurred while setting up the request.",
        {
          message: error.message,
        }
      );
    }
    throw error;
  }
};
