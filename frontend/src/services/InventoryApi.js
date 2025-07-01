import apiClient from "@/config/config.js";
import toast from "react-hot-toast";

export const createInventoryItem = async (formData) => {
  try {
    await apiClient.post("/inventory", formData);
    console.log("item added to inventory", formData);
    toast.success(`${formData.name} Added to Inventory`);
  } catch (error) {
    console.log("Failed adding items", error);
  }
};

export const getInventoryItems = async () => {
  try {
    const { data } = await apiClient.get("/inventory");
    return data;
  } catch (error) {
    console.log("Failed adding items", error);
  }
};

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

    const response = await apiClient.put(`/inventory/${id}`, updatedData);
    toast.success(`"${response.data.data.name}" Has Been Updated.`);

    return response.data;
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

export const getItemByIdAndDelete = async (id) => {
  try {
    if (!id) {
      return;
    }
    const response = await apiClient.delete(`/inventory/${id}`);
    toast.success(`"${response.data.data.name}" removed successfully.`);

    console.log(response.data.data.name);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        `Error: Deleting ${error.response.status} response from server.`,
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
