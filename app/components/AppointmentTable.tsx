import { EyeIcon } from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import ViewAppointmentDetail from "./ViewAppointmentDetail";

export default function AppointmentTable() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const tableData = [
    {
      id: 1,
      service: "doctor",
      customer: "Abhishak",
      date: "9/7/2025",
      time: "12:53:00",
      duration: "12 min",
      price: "₹180.00",
      status: "booked",
    },
    {
      id: 2,
      service: "doctor",
      customer: "Abhishak",
      date: "9/6/2025",
      time: "14:55:00",
      duration: "17 min",
      price: "₹255.00",
      status: "completed",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "booked":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedAppointment(null);
  };

  return (
    <ScrollView className="py-4 w-full">
      <View className="bg-white rounded-xl shadow-md p-4">
        {/* Table Header */}
        <View className="flex flex-row items-center justify-between pb-2 border-b border-gray-200">
          <Text className="flex-1 font-bold text-gray-500 text-sm">Customer</Text>
          <Text className="flex-1 font-bold text-gray-500 text-sm ">Date</Text>
         
          <Text className="flex-1 font-bold text-gray-500 text-sm text-center">Status</Text>
          <Text className="flex-1 font-bold text-gray-500 text-sm text-center">Actions</Text>
        </View>

        {/* Table Rows */}
        <ScrollView>
          {tableData.map((item) => (
            <View
              key={item.id}
              className="flex flex-row items-center py-4 border-b border-gray-100"
            >
              
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-800">
                  {item.customer}
                </Text>
              </View>
              <View className="flex-1 ">
                <Text className="text-xs text-gray-600">{item.date}</Text>
                <Text className="text-xs text-gray-600">{item.time}</Text>
              </View>
              
              <View className="flex-1 ">
                <Text
                  className={`rounded-full text-center px-3 py-1 text-xs font-semibold ${getStatusColor(item.status)}`}
                >
                  {item.status}
                </Text>
              </View>
              <View className="flex-1 flex-row items-center justify-center space-x-2 gap-2">
                <TouchableOpacity onPress={() => handleViewDetails(item)} className="bg-blue-400 px-2 py-1 rounded-xl">
                  <EyeIcon size={30} color="#eee" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* The popup component */}
      <ViewAppointmentDetail
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        appointment={selectedAppointment}
        handleViewDetails={handleViewDetails}
      />
    </ScrollView>
  );
}