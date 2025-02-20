import React from "react";
import { Input } from "@/components/ui/input";

const SearchBar = ({ searchInput, onSearchChange }) => {
  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Search by item or price"
        value={searchInput}
        onChange={onSearchChange}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default SearchBar;
