import { useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import AuthNavbar from "../components/AuthNavbar";
import ChatList from "../components/ChatList";

export default function ChatScreen() {
  const route = useRoute();
  // console.log("Route params:", route.params.userData.token);
  return (
    <View className="bg-blue-100 flex-col h-full  pt-16 pb-28">
      <View className="h-[30px]">
        <AuthNavbar />
      </View>
      <View className="w-full px-2 space-y-2 pt-6  items-center gap-6 mb-8 h-full">
        <View className="rounded-xl w-full py-4 px-4 bg-gray-50 flex-col gap-3">
          <View className="flex-row justify-between px-0">
            <Text className="text-4xl font-bold text-gray-800">
              Chat Screen
            </Text>
          </View>
          <Text className="text-gray-700 text-xl">
            <Text className="text-gray-700 text-xl">
              {route?.params?.userData?.user?.role === "customer"
                ? "Chat with your service provider anytime for guidance or updates."
                : "Connect with your clients and team in real-time."}
            </Text>
          </Text>
        </View>
        <ChatList/>
      </View>
    </View>
  );
}
