import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import AppointmentRow from "./AppointmentRow";
import ViewAppointmentDetail from "./ViewAppointmentDetail";

export default function AppointmentTable({ tableData }) {
  const route = useRoute();
  // console.log("Route params:", route.params.userData.user.role);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedAppointment(null);
  };

  if (!tableData || tableData.length === 0) {
    return (
      <View className="bg-white rounded-xl shadow-md p-4 mt-4">
        <Text className="text-center text-lg text-gray-500">
          No appointments found.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="py-4 w-full mb-[100px]">
      <View className="bg-blue-50 rounded-lg shadow-md p-4 mb-[150px]">
        <View className="flex flex-row items-center justify-between pb-2 border-b border-gray-200">
          <Text className="flex-1 font-bold text-gray-500 text-md">S no.</Text>
          <Text className="flex-1 font-bold text-gray-500 text-md">
            {route?.params?.userData?.user?.role === "customer"
              ? "Service"
              : "Customer"}
          </Text>
          <Text className="flex-1 font-bold text-gray-500 text-md text-center">
            Date & Time
          </Text>
          <Text className="flex-1 font-bold text-gray-500 text-md text-center">
            Status
          </Text>
          <Text className="flex-1 font-bold text-gray-500 text-md text-center">
            Actions
          </Text>
        </View>

        <ScrollView>
          {tableData.map((item) => (
            <AppointmentRow
              key={item.id}
              item={item}
              onDetailsPress={handleViewDetails}
            />
          ))}
        </ScrollView>
      </View>

      <ViewAppointmentDetail
        userDetails={route?.params?.userData}
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        appointment={selectedAppointment}
      />
    </ScrollView>
  );
}
