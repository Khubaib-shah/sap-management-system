import { useState, useContext } from "react";
import { ItemsContext } from "@/context/ItemsContext";

function Processing() {
  const { items } = useContext(ItemsContext);
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredItems = items?.filter((item) => {
    const itemName = item.name.toLowerCase();
    const companyName = item.companyName.toLowerCase();
    const searchTerm = searchInput.toLowerCase();
    return itemName.includes(searchTerm) || companyName.includes(searchTerm);
  });

  const inProductionItems = filteredItems?.filter(
    (item) => item.processing === "sent for sewing"
  );
  const completedItems = filteredItems?.filter(
    (item) => item.processing === "Completed"
  );

  return (
    <div className="space-y-6">
      <h1 className="md:text-3xl font-bold">Processing Management</h1>
      <input
        type="text"
        value={searchInput}
        onChange={handleSearchChange}
        placeholder="Search by item or company name"
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h2 className="font-medium text-2xl text-gray-700 mb-4">
            In Production
          </h2>
          {inProductionItems.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-lg p-6 my-4 border border-gray-200"
            >
              <h3 className="text-gray-600 font-bold text-2xl">
                PKR: {item.price}
              </h3>
              <p className="text-sm text-gray-500 mt-4 flex items-center justify-between font-medium capitalize">
                <span>Items: {item.name}</span>
                <span>Company: {item.companyName.split(" ")[0]}</span>
              </p>
              <hr className="my-2" />
              <p className="text-gray-500 text-sm">
                Updated: {new Date(item.updatedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
        <div>
          <h2 className="font-medium text-2xl text-gray-700">Completed</h2>
          {completedItems.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-lg p-6 my-4 border border-gray-200"
            >
              <h3 className="text-gray-600 font-bold text-2xl">
                PKR: {item.price}
              </h3>
              <p className="text-sm text-gray-500 mt-4 flex items-center justify-between font-medium capitalize">
                <span>Items: {item.name}</span>
                <span>Company: {item.companyName.split(" ")[0]}</span>
              </p>
              <hr className="my-2" />
              <p className="text-gray-500 text-sm">
                Updated: {new Date(item.updatedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Processing;
