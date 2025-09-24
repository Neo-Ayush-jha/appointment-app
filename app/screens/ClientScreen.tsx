import React from "react";
import { ScrollView, Text, View } from "react-native";
import AuthNavbar from "../components/AuthNavbar";
import ClientCard from "../components/ClientCard";
import ClientStatistics from "../components/ClientStatistics";

export default function ClientScreen() {
  return (
    <ScrollView className="bg-blue-100 flex-col h-full  pt-16 pb-28">
      <View className="h-[30px]">
        <AuthNavbar />
      </View>
      <View className="w-full px-2 space-y-2 pt-12  items-center gap-6 mb-8">
        <View className="rounded-xl w-full py-6 px-4 bg-gray-50 flex-col gap-3">
          <View className="flex-row justify-between px-0">
            <Text className="text-4xl font-bold text-gray-800">
              Client Management
            </Text>
          </View>
          <Text className="text-gray-700 text-xl">
            View and manage your client appointments and statistics
          </Text>
        </View>
        <ClientCard />
        <ClientStatistics />
      </View>
    </ScrollView>
  );
}
