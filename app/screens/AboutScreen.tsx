import React from "react";
import { ScrollView, Text, View } from "react-native";
import AuthNavbar from "../components/AuthNavbar";

export default function AboutScreen() {
  return (
    <ScrollView className="bg-blue-100 flex-1 pt-16 pb-28">
      <View className="h-[30px]">
        <AuthNavbar />
      </View>

      <View className="w-full px-4 space-y-6 py-6 gap-4 mb-[100px]">
        <View className="rounded-xl w-full py-6 px-4 bg-gray-50 flex-col gap-3 shadow-md">
          <Text className="text-4xl font-bold text-gray-800">About Us</Text>
          <Text className="text-gray-700 text-lg mt-2">
            Welcome to our Appointment Management System! Our platform allows both users and doctors to efficiently schedule, manage, and track appointments with ease.
          </Text>
        </View>

        <View className="rounded-xl w-full py-6 px-4 bg-gray-50 flex-col gap-4 shadow-md">
          <Text className="text-3xl font-semibold text-gray-800 mb-2">Key Features</Text>
          <Text className="text-gray-700 text-lg">• Schedule appointments easily as a user.</Text>
          <Text className="text-gray-700 text-lg">• Doctors can manage their available slots efficiently.</Text>
          <Text className="text-gray-700 text-lg">• Real-time notifications for appointments and updates.</Text>
          <Text className="text-gray-700 text-lg">• View appointment history and feedback.</Text>
          <Text className="text-gray-700 text-lg">• Reschedule or cancel appointments with confirmation.</Text>
        </View>

        <View className="rounded-xl w-full py-6 px-4 bg-gray-50 flex-col gap-4 shadow-md">
          <Text className="text-3xl font-semibold text-gray-800 mb-2">Our Mission</Text>
          <Text className="text-gray-700 text-lg">
            Our goal is to simplify appointment scheduling and communication between users and professionals. We aim to provide a seamless experience that saves time, reduces errors, and improves overall satisfaction for both clients and service providers.
          </Text>
        </View>

        <View className="rounded-xl w-full py-6 px-4 bg-gray-50 flex-col gap-4 shadow-md">
          <Text className="text-3xl font-semibold text-gray-800 mb-2">Why Choose Us?</Text>
          <Text className="text-gray-700 text-lg">• Easy-to-use interface for both users and doctors.</Text>
          <Text className="text-gray-700 text-lg">• Secure handling of appointment and user data.</Text>
          <Text className="text-gray-700 text-lg">• Instant notifications for new and updated appointments.</Text>
          <Text className="text-gray-700 text-lg">• Reliable and scalable system to manage multiple appointments simultaneously.</Text>
        </View>
      </View>
    </ScrollView>
  );
}
