import { useRoute } from "@react-navigation/native";
import { Plus } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AuthNavbar from "../components/AuthNavbar";
import CreateOrganizationModal from "../components/CreateOrganizationModal";
import OrganizationCard from "../components/OrganizationCard";

export default function Organization() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const route = useRoute();
  // console.log("Route params:", route.params.userData.token);
  
  return (
    <>
      {route?.params?.userData ? (
        <View className="bg-blue-100 flex-col h-full  py-16 ">
          <View className="h-[30px]">
            <AuthNavbar />
          </View>
          <View className="w-full px-2 space-y-2 pt-12 flix-col items-center gap-6 mb-[150px]">
            <View className="rounded-xl w-full py-6 px-4 bg-gray-50 flex-col gap-3">
              <View className="flex-row justify-between px-0">
                <Text className="text-4xl font-bold text-gray-800">
                  Organizations
                </Text>
                {route?.params?.userData?.user?.role !== "customer" && (
                  <View className="flex-col justify-start">
                    <TouchableOpacity
                      onPress={() => setIsModalVisible(true)}
                      className="bg-blue-600 px-3 py-2 rounded-lg flex-row items-center  justify-center"
                    >
                      <Plus size="16" color="#fff" />
                      <Text className=" text-gray-50">Create Organization</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <Text className="text-gray-700 text-xl ps-2">
                Manage organizations and their members
              </Text>
            </View>
            <OrganizationCard />
          </View>
          <CreateOrganizationModal
            isVisible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
          />
        </View>
      ) : (
        <View className="flex-1 justify-center items-center bg-yellow-200">
          <Text className="text-6xl font-bold text-center text-gray-800">
            Loading...
          </Text>
        </View>
      )}
    </>
  );
}
