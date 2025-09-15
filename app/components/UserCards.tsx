import {
  BadgeIndianRupeeIcon,
  Calendar1Icon,
  CheckCircle2Icon,
  CirclePlus,
} from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

export default function UserCards({ user }: { user: any }) {
  return (
    <View className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
      <View className="rounded-xl w-full py-6 px-4 bg-white flex-row items-center gap-4">
        <View className="p-6 rounded-full bg-blue-200">
          <Calendar1Icon size={40} color="#2563eb" />
        </View>
        <View className="flex-3 flex-col">
          <Text className="text-gray-800 text-2xl">Total Appointment</Text>
          <Text className="text-gray-950 text-3xl font-bold">34</Text>
        </View>
      </View>

      <View className="rounded-xl w-full py-6 px-4 bg-white flex-row items-center gap-4">
        <View className="p-6 rounded-full bg-green-200">
          <CheckCircle2Icon size={40} color="#16a34a" />
        </View>
        <View className="flex-3 flex-col">
          <Text className="text-gray-800 text-2xl">Completed</Text>
          <Text className="text-gray-950 text-3xl font-bold">34</Text>
        </View>
      </View>

      <View className="rounded-xl w-full py-6 px-4 bg-white flex-row items-center gap-4">
        <View className="p-6 rounded-full bg-red-200">
          <CirclePlus size={40} color="#dc2626" />
        </View>
        <View className="flex-3 flex-col">
          <Text className="text-gray-800 text-2xl">Cancelled</Text>
          <Text className="text-gray-950 text-3xl font-bold">34</Text>
        </View>
      </View>

      <View className="rounded-xl w-full py-6 px-4 bg-white flex-row items-center gap-4">
        <View className="p-6 rounded-full bg-yellow-200">
          <BadgeIndianRupeeIcon size={40} color="#ca8a04" />
        </View>
        <View className="flex-3 flex-col">
          <Text className="text-gray-800 text-2xl">Revenue</Text>
          <Text className="text-gray-950 text-3xl font-bold">34</Text>
        </View>
      </View>
    </View>
  );
}
