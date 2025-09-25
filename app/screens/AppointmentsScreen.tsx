import { getAllAppointments } from "@/constants/api/User";
import { useRoute } from "@react-navigation/native";
import { Plus } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AppointmentTable from "../components/AppointmentTable";
import AuthNavbar from "../components/AuthNavbar";
import CreateAppointmentModel from "../components/CreateAppointmentModel";
import TableFilter from "../components/TableFilter";

export default function AppointmentsScreen() {
  const route = useRoute();
  // console.log("Route params:", route.params.userData.token);
  const [originalTableData, setOriginalTableData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filteredTableData, setFilteredTableData] = useState([]);

  // if (!userData) return <Text>Loading...</Text>;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getAllAppointments(
          route?.params?.userData?.token
        );
        // console.log("Fetched appointments:", response);
        setOriginalTableData(response?.appointments);
        setFilteredTableData(response?.appointments);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };
    fetchAppointments();
  }, []);

  const handleFilterChange = (status) => {
    if (status === "All") {
      setFilteredTableData(originalTableData);
    } else {
      const filteredData = originalTableData.filter(
        (item) => item.status.toLowerCase() === status.toLowerCase()
      );
      setFilteredTableData(filteredData);
    }
  };

  return (
    <View className="bg-blue-100 flex-col h-full  py-16 ">
      <View className="h-[30px]">
        <AuthNavbar />
      </View>
      <View className="w-full px-2 space-y-2 pt-12 flix-col items-center gap-6 mb-8">
        <View className="rounded-xl w-full py-6 px-4 bg-blue-50 flex-col items-star gap-4">
          <View className="flex-row justify-between px-0">
            <Text className="text-4xl font-bold text-gray-800">
              Appointments
            </Text>
            <View className="flex-col justify-start">
              <TouchableOpacity
                onPress={() => setIsModalVisible(true)}
                className="bg-blue-600 px-3 py-2 rounded-lg flex-row items-center justify-center"
              >
                <Plus size="16" color="#fff" />
                <Text className=" text-gray-50">Create Apponintment</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text className="text-2xl font-semibold text-gray-800">
            Manage client appointments
          </Text>
        </View>
        <TableFilter onFilterChange={handleFilterChange} />
        <AppointmentTable tableData={filteredTableData} />
      </View>
      <CreateAppointmentModel
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
}
