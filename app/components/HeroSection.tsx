import "@/style/global.css";
import MaskedView from "@react-native-masked-view/masked-view";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { AwardIcon, Calendar, StarIcon, Users2Icon } from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import {
  ArrowRightIcon,
  ArrowTrendingUpIcon,
} from "react-native-heroicons/outline";

export default function HeroSection() {
  const navigation = useNavigation();
  return (
    <ScrollView
      className="h-full bg-blue-100 pb-12"
      contentContainerStyle={{
        alignItems: "center",
        paddingTop: 32,
        paddingBottom: 20,
      }}
    >
      <View className="flex-1 items-center text-center gap-2  pb-10 px-4">
        <View className="flex-col items-center text-center gap-6 pb-4 px-4">
          <View className="border rounded-full flex-row border-blue-400 px-6 py-4 items-center">
            <Text className="text-lg text-gray-800 text-center">
              Trusted by 100,000+ Users Worldwide
            </Text>
            <ArrowTrendingUpIcon size={20} color="green" />
          </View>

          <View className="flex-col items-center justify-center text-center gap-4 py-4 px-4">
            <Text className="text-4xl font-bold text-gray-800 leading-tight">
              Book Appointments with
            </Text>
            <MaskedView
              maskElement={
                <Text className="text-7xl text-center font-bold">
                  Professional Experts
                </Text>
              }
            >
              <LinearGradient
                colors={["#2563eb", "#9333ea", "#db2777"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <View>
                  <Text className="text-7xl font-bold text-transparent">
                    Professional Experts
                  </Text>
                </View>
              </LinearGradient>
            </MaskedView>
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
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text className="text-black text-lg font-semibold">Sign In</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View className="flex-col justify-start items-start gap-8 mt-4">
          <View className="flex-col justify-start items-start gap-8 mt-8">
            <View className="flex-row justify-between w-full px-12 items-center gap-8 mt-8">
              <View className="flex-col justify-center items-center border-2 border-gray-300 rounded-xl px-6 py-4">
                <Users2Icon color="#2563eb" size={50} strokeWidth={2} />
                <Text className="text-6xl text-gray-800 font-semibold">
                  10K
                </Text>
                <Text className="text-gray-600 text-lg"> Happy Customers</Text>
              </View>
              <View className="flex-col justify-center items-center border-2 border-gray-300 rounded-xl px-6 py-4">
                <AwardIcon color="#2563eb" size={50} strokeWidth={2} />
                <Text className="text-6xl text-gray-800 font-semibold">
                  500+
                </Text>
                <Text className="text-gray-600 text-lg">Providers</Text>
              </View>
            </View>
            <View className="flex-row justify-between w-full px-12 items-start gap-8 mt-8 ">
              <View className="flex-col justify-center items-center border-2 border-gray-300 rounded-xl px-6 py-4 ">
                <Calendar color="#2563eb" size={50} strokeWidth={2} />
                <Text className="text-6xl text-gray-800 font-semibold">
                  1.2K
                </Text>
                <Text className="text-gray-600 text-lg">
                  Appointments Booked
                </Text>
              </View>
              <View className="flex-col justify-center items-center border-2 border-gray-300 rounded-xl px-6 py-4">
                <StarIcon color="#2563eb" size={50} strokeWidth={2} />
                <Text className="text-6xl text-gray-800 font-semibold">
                  4.8
                </Text>
                <Text className="text-gray-600 text-lg">Avgerage Rating</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
