import { useNavigation } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const chats = [
  { id: 1, name: "Aman Bhai", message: "Koi na", time: "Yesterday" },
  {
    id: 2,
    name: "Jan Leva 💀",
    message: "screenshoth bhejna",
    time: "Yesterday",
  },
  {
    id: 3,
    name: "Ayush Kumar Jha (You)",
    message: "📷 Photo",
    time: "Yesterday",
  },
  { id: 4, name: "The Manager 🚫🏃", message: "😔", time: "Yesterday" },
  {
    id: 5,
    name: "Kriti Singh...",
    message: "lekin lookup km nhi kr rha h ab",
    time: "Yesterday",
  },
  {
    id: 6,
    name: "sanyam Lpu",
    message: "Acha abi rukk gye ha kya",
    time: "Yesterday",
  },
  {
    id: 7,
    name: "💞 Family",
    message: "Mata ji ko Pranam karo",
    time: "Yesterday",
  },
  { id: 8, name: "MAA", message: "Pahuch gaye", time: "Yesterday" },
  {
    id: 9,
    name: "+91 86995 83576",
    message: "Oo thank you sir 😊",
    time: "Yesterday",
  },
];

// Assign random avatar from picsum.photos
chats.forEach((chat) => {
  chat.avatar = `https://picsum.photos/seed/${chat.id}/50/50`;
});

export default function ChatList() {
  const navigation = useNavigation();

  const handleChatPress = (chat) => {
    navigation.navigate("ChatMessages", {  chat });
  };
  return (
    <ScrollView className="bg-gray-50 w-full flex-1 p-2">
      {chats.map((chat) => (
        <TouchableOpacity
          key={chat.id}
          onPress={() => handleChatPress(chat)}
          className="flex-row items-center bg-blue-200 rounded-xl p-3 mb-2"
        >
          <Image
            source={{ uri: chat.avatar }}
            className="w-12 h-12 rounded-full"
          />
          <View className="flex-1 ml-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-800 text-lg font-semibold">
                {chat.name}
              </Text>
              <Text className="text-gray-500 text-sm">{chat.time}</Text>
            </View>
            <Text className="text-gray-500 mt-1">{chat.message}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
