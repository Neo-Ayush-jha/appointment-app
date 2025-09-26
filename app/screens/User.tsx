import AuthNavbar from "@/app/components/AuthNavbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import UserScreen from "../screens/UserScreen";

export default function User() {
  const route = useRoute();
  // const { userData } = route.params || {};
  // if (!userData) return <Text>Loading...</Text>;

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    const getUserData = async () => {
      const stored = await AsyncStorage.getItem("userData");
      console.log("Session ", stored);
      if (stored) {
        setUserData(JSON.parse(stored));
        setLoading(false);
      }
    };
    getUserData();
  }, []);

  return loading ? (
    <View className="flex-1 justify-center items-center bg-blue-100">
      <Text className="text-4xl font-bold">Loading...</Text>
    </View>
  ) : (
    <View className="bg-blue-100 flex-1 pt-16 gap-8">
      <View className="h-[12px]">
        <AuthNavbar />
      </View>
      <View className="w-full px-4 flex-1 items-center gap-8">
        <UserScreen user={userData} />
      </View>
    </View>
  );
}
