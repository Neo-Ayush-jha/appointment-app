import { getChatList } from "@/constants/api/User";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import AuthNavbar from "../components/AuthNavbar";
import ChatList from "../components/ChatList";

export default function ChatScreen() {
  const route = useRoute();
  // console.log("Route params:", route.params.userData.token);

  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true);
        // console.log("Fetching chats...");
        if (!route?.params?.userData?.token) throw new Error("No token found");
        const response = await getChatList(route?.params?.userData?.token);
        if (!response || !response?.conversations)
          throw new Error("Invalid response from server");
        // console.log("Fetched chats:", response?.conversations);
        setChats(response?.conversations || []);
      } catch (err: any) {
        setError(err.message || "Failed to fetch chats");
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, []);
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
        <ChatList conversations={chats}/>
      </View>
    </View>
  );
}
