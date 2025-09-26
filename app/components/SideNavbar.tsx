import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import {
  Building2Icon,
  Calendar1Icon,
  HomeIcon,
  InfoIcon,
  LogOut,
  MessagesSquare,
  NotebookPen,
  Users2,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function SideNavbar(props: any) {
  const [userData, setUserData] = useState(props.userData || {});
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

  // useEffect(() => {
  //     // const getUserData = async () => {
  //     //   const stored = await AsyncStorage.getItem("userData");
  //     //   if (stored) {
  //     //     setUserData(JSON.parse(stored));
  //     //   }
  //     // };
  //     // getUserData();
  // }, [props.userData]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      console.log("User logged out, session cleared!");
      props.navigation.navigate("Dashboard", { screen: "Home" });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  console.log("Ayyy", userData);
  return (
    <>
      {loading ? (
        <View className="flex-1 justify-center items-center bg-blue-100">
          <Text className="text-4xl font-bold">Loading...</Text>
        </View>
      ) : (
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{ flex: 1 }}
          className="h-full w-full bg-blue-100 px-0"
        >
          <View className="bg-blue-600 py-6 px-4 mb-4 rounded-xl">
            <Text className="text-white text-2xl font-bold text-center">
              BookingApp
            </Text>
          </View>

          <View className="flex-1">
            <TouchableOpacity
              className="flex-row items-center px-3 py-3"
              onPress={() =>
                props.navigation.navigate("Dashboard", { screen: "Home" })
              }
            >
              <View className="bg-blue-600 p-2 rounded-full">
                <HomeIcon size={24} color="white" strokeWidth={2} />
              </View>
              <Text className="ml-3 text-xl font-semibold text-gray-600">
                Home
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center px-3 py-3"
              onPress={() => props.navigation.navigate("Appointments")}
            >
              <View className="bg-blue-600 p-2 rounded-full">
                <Calendar1Icon size={24} color="white" strokeWidth={2} />
              </View>
              <Text className="ml-3 text-xl font-semibold text-gray-600">
                Appointments
              </Text>
            </TouchableOpacity>
            {userData?.user?.role !== "customer" && (
              <TouchableOpacity
                className="flex-row items-center px-3 py-3"
                onPress={() => props.navigation.navigate("Client")}
              >
                <View className="bg-blue-600 p-2 rounded-full">
                  <Users2 size={24} color="white" strokeWidth={2} />
                </View>
                <Text className="ml-3 text-xl font-semibold text-gray-600">
                  Client
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              className="flex-row items-center px-3 py-3"
              onPress={() => props.navigation.navigate("Organization")}
            >
              <View className="bg-blue-600 p-2 rounded-full">
                <Building2Icon size={24} color="white" strokeWidth={2} />
              </View>
              <Text className="ml-3 text-xl font-semibold text-gray-600">
                Organization
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center px-3 py-3"
              onPress={() => props.navigation.navigate("About")}
            >
              <View className="bg-blue-600 p-2 rounded-full">
                <MessagesSquare size={24} color="white" strokeWidth={2} />
              </View>
              <Text className="ml-3 text-xl font-semibold text-gray-600">
                Messages
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center px-3 py-3"
              onPress={() => props.navigation.navigate("About")}
            >
              <View className="bg-blue-600 p-2 rounded-full">
                <NotebookPen size={24} color="white" strokeWidth={2} />
              </View>
              <Text className="ml-3 text-xl font-semibold text-gray-600">
                Note
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center px-3 py-3"
              onPress={() => props.navigation.navigate("About")}
            >
              <View className="bg-blue-600 p-2 rounded-full">
                <InfoIcon size={24} color="white" strokeWidth={2} />
              </View>
              <Text className="ml-3 text-xl font-semibold text-gray-600">
                About
              </Text>
            </TouchableOpacity>
          </View>
          <View className="border-t border-gray-300 px-3 py-4">
            <TouchableOpacity
              className="flex-row items-center px-3 py-3 w-full bg-orange-200 rounded-xl"
              onPress={handleLogout}
            >
              <View className=" p-2 rounded-xl ">
                <LogOut size="30" color="#7c2d12" strokeWidth={2} />
              </View>
              <Text className="ml-3 text-xl font-semibold text-orange-900">
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </DrawerContentScrollView>
      )}
    </>
  );
}
