import { submitChat } from "@/constants/api/User";
import { useRoute } from "@react-navigation/native";
import { SendHorizonal } from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AuthNavbar from "../components/AuthNavbar";
import ChatMessage from "../components/ChatMessage";

export default function ChatMessageScreen() {
  const route = useRoute();
  const { chats, userData, appointment_id } = route.params;
  const [input, setInput] = useState("");
  const loggedInUserName = userData?.user?.name;

  const avatarUrl = `https://picsum.photos/seed/${userData?.user?.id}/100`;

  const handelSendMsg = async () => {
    if(!input.trim()) return;

    try{
      const data = {
        appointment_id:appointment_id,
        message:input
      }
      const response = await submitChat(data,userData?.token);
      console.log("Message sent:  ",response)
      setInput("")
    }catch(err){
      console.log("Failed to send msg: ",err)
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="bg-blue-100 flex-col h-full pt-8 pb-8"
    >
      <View className="h-[30px]">
        <AuthNavbar />
      </View>

      <View className="flex-1 w-full px-2 pt-6">
        <View className="rounded-xl w-full py-4 px-4 bg-gray-50 flex-row items-center gap-2 mb-4">
          <Image
            source={{ uri: avatarUrl }}
            className="w-12 h-12 rounded-full"
          />
          <Text className="text-2xl font-semibold text-gray-800">
            {chats.length > 0
              ? chats[0].sender.name === loggedInUserName
                ? chats[0].receiver.name
                : chats[0].sender.name
              : "Chat"}
          </Text>
        </View>

        <ScrollView className="flex-1 mb-20 space-y-2">
          {chats.map((chatItem) => (
            <ChatMessage
              key={chatItem.id}
              chat={chatItem}
              userId={userData?.user?.id}
              loggedInUserName={loggedInUserName}
            />
          ))}
        </ScrollView>

        <View className="absolute bottom-0 w-full bg-blue-100 flex-row justify-center items-center px-4 py-4 border-t border-gray-300 mb-4">
          <TextInput
            className="flex-1 bg-white rounded-full px-4 py-3 text-gray-800"
            placeholder="Type a message..."
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity
            className="ml-3 flex-row font-semibold bg-blue-200 p-3 rounded-full"
            onPress={handelSendMsg}
          >
            <SendHorizonal size="28" color="#2563eb" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
