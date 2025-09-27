import React from "react";
import { Text, View } from "react-native";

export default function ChatMessage({ chat, userId }: any) {
  const isSentByUser = chat.receiver.id !== userId;

  return (
    <View
      className={`flex-row ${isSentByUser ? "justify-end" : "justify-start"} my-2 w-full px-4`}
    >
      <View
        className={`max-w-[75%] px-3 py-2 rounded-xl ${
          isSentByUser ? "bg-green-600 rounded-tr-none" : "bg-gray-300 rounded-tl-none"
        }`}
      >
        <Text className={`${isSentByUser ? "text-white" : "text-gray-800"} text-base`}>
          {chat.message}
        </Text>
        <Text className={`text-xs mt-1 ${isSentByUser ? "text-white/70" : "text-gray-600"}`}>
          {chat.time}
        </Text>
      </View>
      
    </View>
  );
}
