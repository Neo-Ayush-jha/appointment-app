import { LinearGradient } from "expo-linear-gradient";
import { StethoscopeIcon } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

export default function ServiceCard() {
  return (
    <View className="p-6 flex-col items-center gap-4">
      <View className="bg-blue-100 flex-col justify-center w-full py-12 px-8 rounded-xl shadow">
        <View
          className="w-28 h-28"
          style={{ borderRadius: 12, overflow: "hidden" }}
        >
          <LinearGradient
            colors={["#4FC3F7", "#29B6F6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="px-8 py-6  flex items-center justify-center shadow rounded-xl"
          >
            <StethoscopeIcon size={60} color="white" />
          </LinearGradient>
        </View>
        <View className=" mt-4 flex-row justify-between items-center w-full">
          <Text className="mt-4 text-center font-bold text-gray-800 text-2xl">
            Medical Professionals
          </Text>
          <Text className="text-gray-600 text-center font-semibold bg-blue-200 px-4 py-2  mt-4 rounded-full">
            10,000+ Doctors
          </Text>
        </View>
      </View>
    </View>
  );
}
