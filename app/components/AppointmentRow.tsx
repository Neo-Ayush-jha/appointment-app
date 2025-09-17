import { EyeIcon } from "lucide-react-native";
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';


export default function AppointmentRow({ item, onDetailsPress }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "booked":
        return "bg-blue-100 text-blue-800";
      case "scheduled":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <View className="flex flex-row items-center py-4 border-b border-gray-100">
      <View className="flex-1">
        <Text className="text-md font-medium text-gray-800">{item.id}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-md font-medium text-gray-800">{item.customer}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-xs text-gray-600">{item.date}</Text>
        <Text className="text-xs text-gray-600">{item.time}</Text>
      </View>
      <View className="flex-1 items-center">
        <Text
          className={`rounded-full text-center px-3 py-1 text-xs font-semibold ${getStatusColor(item.status)}`}
        >
          {item.status}
        </Text>
      </View>
      <View className="flex-1 flex-row items-center justify-center">
        <TouchableOpacity
          onPress={() => onDetailsPress(item)}
          className="bg-blue-400 px-2 py-1 rounded-xl"
        >
          <EyeIcon size={30} color="#eee" />
        </TouchableOpacity>
      </View>
    </View>
  );
}