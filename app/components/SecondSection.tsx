import { SparkleIcon } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import ServiceCard from "./ServiceCard";

export default function SecondSection() {
  return (
    <View className=" bg-blue-50 py-12 px-4">
      <View className="flex-col items-center justify-center gap-2 mb-4 px-8">
        <View className="mb-8 py-4 px-16 rounded-full bg-blue-100 flex-row items-center gap-2">
          <Text>
            <SparkleIcon size={20} color="#2563eb" />
          </Text>
          <Text className="text-blue-600 text-xl font-medium">
            Professional Services
          </Text>
        </View>
        <Text className="text-4xl font-bold">Choose Your Service</Text>
        <Text className="text-center text-gray-600 text-xl mt-4 max-w-2xl">
          Connect with verified professionals across multiple industries and
          book instantly
        </Text>
      </View>
      <ServiceCard />
    </View>
  );
}
