import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function TableFilter({ onFilterChange }) {
  const [activeFilter, setActiveFilter] = useState("All");

   const filters = [
    { label: "All", value: "All" },
    { label: "Booked", value: "booked" }, 
    { label: "Pending Reschedule", value: "pending_reschedule" }, 
    { label: "Completed", value: "completed" },
    { label: "Cancelled", value: "cancelled" },
    { label: "Reschedule Requested", value: "reschedule requested" }, 
  ];

  const handleFilterPress = (filterValue) => {
    setActiveFilter(filterValue);
    onFilterChange(filterValue);
  };

  return (
    <View className="bg-blue-50 rounded-xl shadow-md px-4 py-2 w-full">
      <View className="flex-row flex-wrap justify-between">
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.value}
            className={`w-[32%] my-1 rounded-lg py-2 items-center ${
              activeFilter === filter.value ? "bg-blue-600" : "bg-gray-100"
            }`}
            onPress={() => handleFilterPress(filter.value)}
          >
            <Text
              className={`font-semibold text-center text-sm ${
                activeFilter === filter.value ? "text-white" : "text-gray-600"
              }`}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}