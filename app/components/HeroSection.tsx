import "@/style/global.css";
import React from "react";
import { Text, View } from "react-native";
import { ArrowRightIcon } from "react-native-heroicons/outline";

export default function HeroSection() {
  return (
    <View className="h-full bg-gradient-to-r from-blue-600 to-indigo-700 items-center pt-14">
      <View className="flex-1 items-center text-center gap-2 py-4 px-4">
        <View className="flex-col items-center text-center gap-6 py-4 px-4">
          <View className="flex-col items-center text-center gap-4 py-4 px-4">
            <Text className="text-black font-semibold text-5xl">
            Book Appointments
          </Text>
          <Text className="text-5xl text-blue-600 font-semibold">
            Make Simple
          </Text>
          </View>
          <Text className="text-2xl text-gray-600 mt-4 text-center px-4">
            Connect with professional doctors, barbers, and service providers.
            Schedule appointments effortlessly and manage your bookings all in
            one place.
          </Text>
        </View>

        <View className="flex-row items-center justify-center gap-4 pt-8">
          <View className="bg-blue-600 px-6 py-3 rounded-md flex-row items-center gap-2">
            <Text className="text-white text-lg font-semibold">
              Get Started
            </Text>
            <ArrowRightIcon size={20} color="white" />
          </View>
          <View className="bg-neutral-400 px-6 py-3 rounded-md">
            <Text className="text-black text-lg font-semibold">Sign In</Text>
          </View>
        </View>

        <View className="flex-col justify-start items-start gap-8 mt-6">
          <View className="flex-col justify-start items-start gap-8 mt-8">
            <View className="flex-row justify-between w-full px-12 items-center gap-8 mt-8">
              <View className="flex-col justify-center items-center">
                <Text className="text-6xl text-blue-600 font-semibold">10,000</Text>
                <Text className="text-gray-600 text-lg">Happy Customers</Text>
              </View>
              <View className="flex-col justify-center items-center">
                <Text className="text-6xl text-blue-600 font-semibold">500+</Text>
                <Text className="text-gray-600 text-lg">Providers</Text>
              </View>
            </View>
            <View className="flex-row justify-between w-full px-12 items-start gap-8 mt-8">
              <View className="flex-col justify-center items-center">
                <Text className="text-6xl text-blue-600 font-semibold">1,200</Text>
                <Text className="text-gray-600 text-lg">Appointments Booked</Text>
              </View>
              <View className="flex-col justify-center items-center">
                <Text className="text-6xl text-blue-600 font-semibold">4.8</Text>
                <Text className="text-gray-600 text-lg">Avgerage Rating</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
