import AuthNavbar from "@/app/components/AuthNavbar";
import { useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import UserScreen from "../screens/UserScreen";

export default function User() {
  const route = useRoute();
  const { userData } = route.params || {};
  if (!userData) return <Text>Loading...</Text>;

  
  return (
    <View className="bg-blue-100 flex-col h-full gap-8  pt-16 ">
      <View className="h-[12px]">
        <AuthNavbar  />
      </View>
      <View className=" w-full px-4 h-full flex-col items-center gap-8 ">
        <UserScreen user={userData} />
      </View>
    </View>
  );
}
