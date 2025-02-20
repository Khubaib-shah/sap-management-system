import { useState, useEffect, useMemo } from "react";
import { getInventoryItems } from "@/services/InventoryApi";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

function Completed() {
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
  const { completedItems } = useMemo(() => {
    const completed = filteredItems.filter(
      (item) => item.processing.toLowerCase() === "completed"
    );
    return { completedItems: completed };
  }, [filteredItems]);

  // Render item card
  const renderItemCard = (item) => (
    <div
      key={item._id}
      className="bg-white shadow-lg rounded-xl p-6 my-4 border border-gray-100 hover:shadow-xl transition-shadow duration-300 relative"
    >
      <h3 className="text-gray-800 font-bold text-2xl mb-2">
        {item.price ? `PKR: ${item.price}` : "N/A"}
      </h3>
      <div className="absolute top-6 right-5">
        <Link to={`/inventory/${item._id}`} className="w-full block">
          <FileText />
        </Link>
      </div>
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
    <div className="space-y-8 bg-gray-50 min-h-screen">
      {/* Title of the page */}
      <h1 className="text-lg md:text-2xl lg:text-3xl font-bold">Completed</h1>

      {/* Search input */}
      <input
        type="text"
        value={searchInput}
        onChange={handleSearchChange}
        placeholder="Search by item or company name"
        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />

      {/* Grid container for displaying 'Completed' items */}
      <div className="grid gap-1">
        {/* Completed Section */}
        <div>
          <h2 className="font-semibold text-2xl text-gray-800 mb-4">
            Completed: {completedItems.length}
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

export default Completed;
