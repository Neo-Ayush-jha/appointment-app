import { useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import AppointmentTable from "../components/AppointmentTable";
import AuthNavbar from "../components/AuthNavbar";

export default function AppointmentsScreen() {
  const route = useRoute();
  const userData  = route.params || {};
  if (!userData) return <Text>Loading...</Text>;

  return (
    <View className="bg-blue-100 flex-col h-full  pt-16 ">
      <View className="h-[30px]">
        <AuthNavbar />
      </View>
      <View className="w-full px-2 space-y-2 pt-12 flix-col items-center gap-6">
        <View className="rounded-xl w-full py-6 px-4 bg-white flex-col items-star gap-4">
          <Text className="text-4xl font-bold text-gray-800">Appointments</Text>
          <Text className="text-2xl font-semibold text-gray-800">
            Manage client appointments
          </Text>
        </View>
        <AppointmentTable />
      </View>
    </View>
  );
}
