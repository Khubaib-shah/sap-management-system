import apiClient from "@/config/config.js";
import { useParams } from "react-router-dom";
export const createInventoryItem = async (formData) => {
  try {
    await apiClient.post("/inventory", formData);
    console.log("item added to inventory", formData);
  } catch (error) {
    console.log("Failed adding items", error);
  }
};
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
export const updateInventoryItem = async (id, updatedData) => {
  try {
    if (!updatedData) {
      return;
    }
    const response = await apiClient.put(`/inventory/${id}`, updatedData);
    console.log(updatedData);
    const data = response.data;
    return data;
  } catch (error) {
    console.log("Failed adding items", error);
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
