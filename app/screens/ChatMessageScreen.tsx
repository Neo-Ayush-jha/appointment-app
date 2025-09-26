import { useRoute } from "@react-navigation/native";
import { SendHorizonal } from "lucide-react-native";
import React, { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import AuthNavbar from "../components/AuthNavbar";
import ChatMessage from "../components/ChatMessage";

export default function ChatMessageScreen() {
  const route = useRoute();
  const { chat } = route.params;
  const [input, setInput] = useState("");
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="bg-blue-100 flex-col h-full pt-8 pb-8"
    >
      <View className="h-[30px]">
        <AuthNavbar />
      </View>
      <View className="w-full px-2 space-y-2 pt-6 items-center gap-6 mb-8 h-full">

        <View className="rounded-xl w-full py-4 px-4 bg-gray-50 flex-col gap-3">
          <View className="flex-row justify-start items-center gap-2 px-0">
            <Image
              source={{ uri: chat.avatar }}
              className="w-12 h-12 rounded-full"
            />
            <Text className="text-3xl font-semibold  text-gray-800">
              {chat.name}
            </Text>
          </View>
        </View>

        <ChatMessage chat={chat} />

        <View className="absolute bottom-0 w-full bg-blue-100 flex-row justify-center items-center px-4 py-4 border-t border-gray-300">
          <TextInput
            className="flex-1 bg-white rounded-full px-4 py-3 text-gray-800"
            placeholder="Type a message..."
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity
            className="ml-3 flex-row  font-semibold bg-blue-200 p-3 rounded-full"
            onPress={() => {}}
          >
            <SendHorizonal size="28" color="#2563eb" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
