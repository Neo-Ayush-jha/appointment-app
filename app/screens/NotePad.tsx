import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AuthNavbar from "../components/AuthNavbar";

export default function NotePad() {
  const [note, setNote] = useState("");

  const handleSaveNote = () => {
    console.log("Saved Note:", note);
    alert("Note saved!");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-blue-100 pt-16"
    >
      <View className="h-[30px]">
        <AuthNavbar />
      </View>

      <ScrollView className="flex-1 px-4 pt-6 pb-20">
        <View className="rounded-xl w-full bg-gray-50 p-4 shadow-md">
          <Text className="text-3xl font-bold text-gray-800 mb-4">Your Notes</Text>
          <TextInput
            className="bg-white rounded-xl p-4 text-gray-800 text-lg h-80"
            placeholder="Write your note here..."
            value={note}
            onChangeText={setNote}
            multiline={true}
            textAlignVertical="top"
          />
          <TouchableOpacity
            className="bg-blue-500 mt-4 py-3 rounded-xl items-center"
            onPress={handleSaveNote}
          >
            <Text className="text-white text-lg font-semibold">Save Note</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
