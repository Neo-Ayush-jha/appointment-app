import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View } from "react-native";
import AppointmentTable from "../components/AppointmentTable";
import AuthNavbar from "../components/AuthNavbar";
import TableFilter from "../components/TableFilter";

export default function AppointmentsScreen() {
  const route = useRoute();
  const userData = route.params || {};
  // if (!userData) return <Text>Loading...</Text>;

  const originalTableData = [
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
    {
      id: 3,
      service: "dentist",
      customer: "Rahul",
      date: "9/8/2025",
      time: "10:00:00",
      duration: "30 min",
      price: "₹500.00",
      status: "scheduled",
    },
    {
      id: 4,
      service: "therapist",
      customer: "Priya",
      date: "9/9/2025",
      time: "11:30:00",
      duration: "60 min",
      price: "₹800.00",
      status: "cancelled",
    },
    {
      id: 5,
      service: "doctor",
      customer: "Rohan",
      date: "9/10/2025",
      time: "14:00:00",
      duration: "20 min",
      price: "₹200.00",
      status: "reschedule requested",
    },
    {
      id: 6,
      service: "hair stylist",
      customer: "Sunita",
      date: "9/11/2025",
      time: "09:00:00",
      duration: "45 min",
      price: "₹350.00",
      status: "booked",
    },
    {
      id: 7,
      service: "dentist",
      customer: "Amit",
      date: "9/12/2025",
      time: "15:30:00",
      duration: "25 min",
      price: "₹450.00",
      status: "completed",
    },
    {
      id: 8,
      service: "therapist",
      customer: "Meera",
      date: "9/13/2025",
      time: "16:00:00",
      duration: "50 min",
      price: "₹750.00",
      status: "scheduled",
    },
    {
      id: 9,
      service: "doctor",
      customer: "Vikram",
      date: "9/14/2025",
      time: "10:30:00",
      duration: "15 min",
      price: "₹200.00",
      status: "booked",
    },
    {
      id: 10,
      service: "hair stylist",
      customer: "Geeta",
      date: "9/15/2025",
      time: "17:00:00",
      duration: "40 min",
      price: "₹300.00",
      status: "completed",
    },
    {
      id: 11,
      service: "dentist",
      customer: "Vijay",
      date: "9/16/2025",
      time: "11:00:00",
      duration: "35 min",
      price: "₹550.00",
      status: "scheduled",
    },
    {
      id: 12,
      service: "therapist",
      customer: "Anjali",
      date: "9/17/2025",
      time: "12:00:00",
      duration: "55 min",
      price: "₹900.00",
      status: "cancelled",
    },
    {
      id: 13,
      service: "doctor",
      customer: "Prashant",
      date: "9/18/2025",
      time: "13:30:00",
      duration: "22 min",
      price: "₹220.00",
      status: "reschedule requested",
    },
    {
      id: 14,
      service: "hair stylist",
      customer: "Kiran",
      date: "9/19/2025",
      time: "14:30:00",
      duration: "50 min",
      price: "₹400.00",
      status: "booked",
    },
    {
      id: 15,
      service: "dentist",
      customer: "Ajay",
      date: "9/20/2025",
      time: "10:45:00",
      duration: "28 min",
      price: "₹480.00",
      status: "completed",
    },
    {
      id: 16,
      service: "therapist",
      customer: "Smita",
      date: "9/21/2025",
      time: "11:15:00",
      duration: "65 min",
      price: "₹850.00",
      status: "scheduled",
    },
    {
      id: 17,
      service: "doctor",
      customer: "Tarun",
      date: "9/22/2025",
      time: "09:30:00",
      duration: "18 min",
      price: "₹240.00",
      status: "booked",
    },
    {
      id: 18,
      service: "hair stylist",
      customer: "Sneha",
      date: "9/23/2025",
      time: "18:00:00",
      duration: "35 min",
      price: "₹380.00",
      status: "completed",
    },
  ];

  const [filteredTableData, setFilteredTableData] = useState(originalTableData);

  const handleFilterChange = (status) => {
    if (status === "All") {
      setFilteredTableData(originalTableData);
    } else {
      const filteredData = originalTableData.filter(
        (item) => item.status.toLowerCase() === status.toLowerCase()
      );
      setFilteredTableData(filteredData);
    }
  };

  return (
    <View className="bg-blue-100 flex-col h-full  py-16 ">
      <View className="h-[30px]">
        <AuthNavbar />
      </View>
      <View className="w-full px-2 space-y-2 pt-12 flix-col items-center gap-6 mb-8">
        <View className="rounded-xl w-full py-6 px-4 bg-blue-50 flex-col items-star gap-4">
          <Text className="text-4xl font-bold text-gray-800">Appointments</Text>
          <Text className="text-2xl font-semibold text-gray-800">
            Manage client appointments
          </Text>
        </View>
        <TableFilter onFilterChange={handleFilterChange} />
        <AppointmentTable tableData={filteredTableData} />
      </View>
    </View>
  );
}
