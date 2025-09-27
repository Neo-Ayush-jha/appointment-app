import { getChatDetails } from "@/constants/api/User";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface Conversation {
  last_message: {
    id: string;
    sender: { name: string };
    receiver: { name: string };
    message: string;
    created_at: string;
  };
  appointment?: { id: string };
}

interface ChatListProps {
  conversations: Conversation[];
}

export default function ChatList({ conversations }: ChatListProps) {
  const route = useRoute();
  const navigation = useNavigation();
  const loggedInUserName = route?.params?.userData?.user?.name;

  const handleChatPress = async (appointment_id: string) => {
    try {
      const token = route?.params?.userData?.token;
      if (!token) throw new Error("No token found");

      const response = await getChatDetails(appointment_id, token);

      if (!response?.chats) throw new Error("Invalid response from server");

      const chats = response.chats;

      navigation.navigate("ChatMessages", { chats, appointment_id });
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to fetch chats");
    }
  };

  return (
    <ScrollView className="bg-gray-50 w-full flex-1 p-2">
      {conversations.map((conv) => {
        const lastMessage = conv.last_message;
        const chatName =
          lastMessage.sender.name === loggedInUserName
            ? lastMessage.receiver.name
            : lastMessage.sender.name;
        const chatMessage =
          lastMessage.message.length > 40
            ? lastMessage.message.slice(0, 40) + "..."
            : lastMessage.message;
        const chatTime = new Date(lastMessage.created_at).toLocaleTimeString(
          [],
          { hour: "2-digit", minute: "2-digit" }
        );
        const avatarUrl = `https://picsum.photos/seed/${lastMessage.id}/100`;
        const appointment_id = conv?.appointment?.id;

        return (
          <TouchableOpacity
            key={lastMessage.id}
            onPress={() => handleChatPress(appointment_id)}
            className="flex-row items-center bg-blue-200 rounded-xl p-3 mb-2"
          >
            <Image
              source={{ uri: avatarUrl }}
              className="w-12 h-12 rounded-full"
            />
            <View className="flex-1 ml-3">
              <View className="flex-row justify-between items-center">
                <Text className="text-gray-800 text-lg font-semibold">
                  {chatName}
                </Text>
                <Text className="text-gray-500 text-sm">{chatTime}</Text>
              </View>
              <Text className="text-gray-500 mt-1">{chatMessage}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
