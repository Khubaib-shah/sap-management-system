import { useState, useContext } from "react";
import { ItemsContext } from "@/context/ItemsContext";

function Processing() {
  const { items } = useContext(ItemsContext);
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredItems = (items || []).filter((item) => {
    const itemName = item.name?.toLowerCase() || "";
    const companyName = item.companyName?.toLowerCase() || "";
    const searchTerm = searchInput.toLowerCase();
    return itemName.includes(searchTerm) || companyName.includes(searchTerm);
  });

  const inProductionItems = filteredItems?.filter(
    (item) => item.processing.toLowerCase() === "sent for sewing".toLowerCase()
  );
  const completedItems = filteredItems?.filter(
    (item) => item.processing.toLowerCase() === "completed"
  );

  return (
    <div className="space-y-6">
      <h1 className="md:text-3xl font-bold">Processing Management</h1>
      {inProductionItems.length || completedItems.length ? (
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchChange}
          placeholder="Search by item or company name"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      ) : null}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h2 className="font-medium text-2xl text-gray-700 ">In Production</h2>
          {inProductionItems.length ? (
            inProductionItems.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-md rounded-lg p-6 my-4 border border-gray-200"
              >
                <h3 className="text-gray-600 font-bold text-2xl">
                  {item.price ? `PKR: ${item.price}` : "N/A"}
                </h3>
                <p className="text-sm text-gray-500 mt-4 flex items-center justify-between font-medium capitalize">
                  <span>Items: {item.name}</span>
                  <span>Company: {item.companyName.split(" ")[0]}</span>
                </p>
                <hr className="my-2" />
                <p className="text-gray-500 text-sm">
                  Updated:{" "}
                  {new Date(item.updatedAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))
          ) : (
            <h2 className="pt-4">No Order for Sewing</h2>
          )}
        </div>
        <div>
          <h2 className="font-medium text-2xl text-gray-700">Completed</h2>
          {completedItems.length ? (
            completedItems.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-md rounded-lg p-6 my-4 border border-gray-200"
              >
                <h3 className="text-gray-600 font-bold text-2xl">
                  {item.price ? `PKR: ${item.price}` : "N/A"}
                </h3>
                <p className="text-sm text-gray-500 mt-4 flex items-center justify-between font-medium capitalize">
                  <span>Items: {item.name}</span>
                  <span>Company: {item.companyName.split(" ")[0]}</span>
                </p>
                <hr className="my-2" />
                <p className="text-gray-500 text-sm">
                  Updated:{" "}
                  {new Date(item.updatedAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))
          ) : (
            <h2 className="pt-4">0 Order Completed</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default Processing;
