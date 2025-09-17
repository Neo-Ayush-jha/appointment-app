import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function TableFilter({ onFilterChange }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    "All",
    "Booked",
    "Scheduled",
    "Completed",
    "Cancelled",
    "Reschedule Requested",
  ];

  const handleFilterPress = (filter) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <View className="bg-blue-50 rounded-xl shadow-md px-4 py-2 w-full">
      <View className="flex-row flex-wrap justify-between">
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            className={`w-[32%] my-1 rounded-lg py-2 items-center ${
              activeFilter === filter ? "bg-blue-600" : "bg-gray-100"
            }`}
            onPress={() => handleFilterPress(filter)}
          >
            <Text
              className={`font-semibold text-center text-sm ${
                activeFilter === filter ? "text-white" : "text-gray-600"
              }`}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}