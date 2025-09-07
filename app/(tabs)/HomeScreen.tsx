import HomeBar from "@/app/components/HomeBar";
import Navbar from "@/app/components/Navbar";
import "@/style/global.css";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
const ios = Platform.OS === "ios";

export default function HomeScreen() {
  return (
    <View className="bg-gray-200 flex-col h-full  pt-16 ">
      <View className="h-[30px]">
        <Navbar />
      </View>
      <View>
        <HomeBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    backgroundColor: "#eab388",
  },
});
