import { useState, useEffect, useMemo } from "react";
import { getInventoryItems } from "@/services/InventoryApi";

function Processing() {
  const [items, setItems] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getInventoryItems();
        setItems(data);
      } catch (error) {
        console.error("Error fetching inventory items:", error);
      }
    };
    fetchData();
  }, []);

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Filter items based on search term
  const filteredItems = useMemo(() => {
    if (!items.length) return [];
    const searchTerm = searchInput.toLowerCase();
    return items.filter((item) => {
      const itemName = item.name?.toLowerCase() || "";
      const companyName = item.companyName?.toLowerCase() || "";
      return itemName.includes(searchTerm) || companyName.includes(searchTerm);
    });
  }, [items, searchInput]);

  // Separate items into 'in production' and 'completed' categories
  const { inProductionItems, completedItems } = useMemo(() => {
    const inProduction = filteredItems.filter(
      (item) => item.processing.toLowerCase() === "sent for sewing"
    );
    const completed = filteredItems.filter(
      (item) => item.processing.toLowerCase() === "completed"
    );
    return { inProductionItems: inProduction, completedItems: completed };
  }, [filteredItems]);

  // Render item card
  const renderItemCard = (item) => (
    <div
      key={item._id}
      className="bg-white shadow-lg rounded-xl p-6 my-4 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
    >
      <h3 className="text-gray-800 font-bold text-2xl mb-2">
        {item.price ? `PKR: ${item.price}` : "N/A"}
      </h3>
      <p className="text-sm text-gray-600 mt-4 flex items-center justify-between font-medium capitalize">
        <span>Items: {item.name}</span>
        <span>Company: {item.companyName.split(" ")[0]}</span>
      </p>
      <hr className="my-3 border-gray-100" />
      <p className="text-gray-500 text-sm">
        Updated:{" "}
        {new Date(item.updatedAt).toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  );

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Title of the page */}
      <h1 className="text-4xl font-bold text-gray-900">
        Processing Management
      </h1>

      {/* Search input */}
      {(inProductionItems.length > 0 || completedItems.length > 0) && (
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchChange}
          placeholder="Search by item or company name"
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      )}

      {/* Grid container for displaying 'In Production' and 'Completed' items */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* In Production Section */}
        <div>
          <h2 className="font-semibold text-2xl text-gray-800 mb-4">
            In Production
          </h2>
          {inProductionItems.length > 0 ? (
            inProductionItems.map(renderItemCard)
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <h2 className="text-gray-500 text-lg">No Orders for Sewing</h2>
            </div>
          )}
        </div>

        {/* Completed Section */}
        <div>
          <h2 className="font-semibold text-2xl text-gray-800 mb-4">
            Completed
          </h2>
          {completedItems.length > 0 ? (
            completedItems.map(renderItemCard)
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <h2 className="text-gray-500 text-lg">0 Orders Completed</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Processing;
