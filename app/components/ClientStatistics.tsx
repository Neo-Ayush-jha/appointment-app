import { Users2Icon } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function ClientStatistics() {
  const [showDetails, setShowDetails] = useState(false); // Initially hide details as per the image

  const client = {
    name: "Abhishak",
    email: "abhishak@example.com",
    stats: {
      total: 2,
      completed: 1,
      cancelled: 0,
      revenue: 255.0,
      lastVisit: "9/7/2025",
    },
    appointments: [
      {
        service: "doctor",
        date: "9/7/2025 at 12:53:00",
        status: "booked",
        price: 180.0,
      },
      {
        service: "doctor",
        date: "9/6/2025 at 14:55:00",
        status: "completed",
        price: 255.0,
        feedback: true,
      },
    ],
  };

  const statusColors = {
    booked: "bg-gray-100 text-gray-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <View className="rounded-xl w-full py-6 px-4 bg-white flex-col gap-4 mb-[100px]">
      <View className="flex-row justify-between items-center border-b border-gray-200 pb-2">
        <Text className="text-gray-600 font-bold text-xl">
          Client Statistics
        </Text>
        <Users2Icon size={24} color="#2563eb" />
      </View>
      {/* Client Info & Stats */}
      <View className="flex-row items-center justify-between gap-2">
        {/* Left side (Client Info) */}
        <View className="flex-row items-center gap-2">
          <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center">
            <Text className="text-blue-600 font-bold text-lg">
              {client.name[0]}
            </Text>
          </View>
          <View className="ml-1 flex-col justify-start ">
            <Text className="text-gray-800 font-semibold">{client.name}</Text>
            <Text className="text-gray-500 text-sm">{client.email}</Text>
          </View>
        </View>

        {/* Right side (Stats and Toggle) */}
        <View className="flex-row items-center space-x-4 gap-4">
          <View className="items-center flex-col justify-center">
            <Text className="text-gray-800 font-semibold flex">
              {client.stats.total}
            </Text>
            <Text className="text-gray-500 flex">Total</Text>
          </View>

          <View className="items-center flex-col justify-center">
            <Text className="text-gray-900 font-semibold">
              ₹{client.stats.revenue.toFixed(2)}
            </Text>
            <Text className="text-gray-500 flex">Revenue</Text>
          </View>

          <TouchableOpacity onPress={() => setShowDetails(!showDetails)}>
            <Text className="text-blue-600">
              {showDetails ? "Hide Details" : "Show Details"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Appointment History (toggle) */}
      {showDetails && (
        <View className="mt-4">
          <Text className="font-semibold text-gray-800 mb-2">
            Appointment History
          </Text>

          {client.appointments.map((a, index) => (
            <View
              key={index}
              className="border-b border-gray-200 py-3 flex-row justify-between items-center"
            >
              <View>
                <Text className="text-gray-900 font-medium">{a.service}</Text>
                <Text className="text-gray-500 text-sm mt-1">{a.date}</Text>
                {a.feedback && (
                  <TouchableOpacity>
                    <Text className="text-blue-600 mt-2">View Feedback</Text>
                  </TouchableOpacity>
                )}
              </View>

              <View className="items-end">
                <Text
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[a.status]}`}
                >
                  {a.status}
                </Text>
                <Text className="mt-2 font-semibold text-gray-800">
                  ₹{a.price.toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
