import React from "react";
import { Text, View, Image } from "react-native";

export default function ChatMessage({ chat, userId }: any) {
  const isSentByUser = chat.senderId !== userId;

  return (
    <View
      className={`flex-row ${isSentByUser ? "justify-end" : "justify-start"} my-1 w-full`}
    >
      {!isSentByUser && (
        <Image
          source={{ uri: chat.avatar }}
          className="w-8 h-8 rounded-full mr-2"
        />
      )}
      <View
        className={`max-w-[75%] p-3 rounded-xl ${
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
      {isSentByUser && (
        <Image
          source={{ uri: chat.avatar }}
          className="w-8 h-8 rounded-full ml-2"
        />
      )}
    </View>
  );
}
