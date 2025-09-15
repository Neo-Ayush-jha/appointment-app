import AuthNavbar from "@/app/components/AuthNavbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import UserScreen from "../screens/UserScreen";

export default function User() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const stored = await AsyncStorage.getItem("userData");
      if (stored) {
        setUserData(JSON.parse(stored));
      }
    };
    getUserData();
  }, []);

  if (!userData) return <Text>Loading...</Text>;

  return (
    <View className="bg-blue-100 flex-col h-full gap-8  pt-16 ">
      <View className="h-[12px]">
        <AuthNavbar user={userData.user} />
      </View>
      <View className=" w-full px-4 h-full flex-col items-center gap-8 ">
        <UserScreen user={userData} />
      </View>
    </View>
  );
}
