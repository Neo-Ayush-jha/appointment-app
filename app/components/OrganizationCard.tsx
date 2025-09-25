import { getAllOrganizations } from "@/constants/api/User";
import { useRoute } from "@react-navigation/native";
import { Building, Calendar, Mail, Phone, Users } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function OrganizationCard() {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const route = useRoute();
  // console.log("Route params:", route.params.userData.token);
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await getAllOrganizations(route.params.userData?.token);

        let filteredOrgs = [];

        if (route.params.userData?.user?.role === "admin") {
          filteredOrgs = response.organizations;
        } else {
          filteredOrgs = response.organizations.filter(
            (org: any) => org.is_approved === 1
          );
        }

        setOrganizations(filteredOrgs);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrganizations();
  }, []);

  const roleColors = {
    doctor: "bg-blue-100 text-blue-700",
    barber: "bg-green-100 text-green-700",
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  return (
    <FlatList
      data={organizations}
      keyExtractor={(item) => item?.id.toString()}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => {
        const bgColor = item.is_approved === 0 ? "bg-red-200" : "bg-white";

        return (
          <View
            className={`${bgColor} w-full flex-col gap-1 rounded-xl shadow-md p-6 mb-4`}
          >
            {/* Title + ID */}
            <Text className="text-xl font-bold text-gray-900">{item.name}</Text>
            <Text className="text-gray-500 text-sm">ID: {item.id}</Text>

            {/* Description */}
            <Text className="text-gray-700 mt-2 text-lg">
              {item.description}
            </Text>

            {/* Address */}
            <View className="flex-row mt-3 gap-2 justify-start items-center">
              <Building size={18} color="#555" />
              <Text className="text-gray-600 flex-1 text-lg">
                {item.address}
              </Text>
            </View>

            {/* Phone */}
            <View className="flex-row mt-3 gap-2 justify-start items-center">
              <Phone size={18} color="#555" />
              <Text className="ml-2 text-gray-600">{item.phone}</Text>
            </View>

            {/* Email */}
            <View className="flex-row mt-3 gap-2 justify-start items-center">
              <Mail size={18} color="#555" />
              <Text className="ml-2 text-gray-600">{item.email}</Text>
            </View>

            {/* Established Date */}
            <View className="flex-row mt-3 gap-2 justify-start items-center">
              <Calendar size={18} color="#555" />
              <Text className="ml-2 text-gray-600">
                Established: {formatDate(item.established_date)}
              </Text>
            </View>

            {/* Members */}
            <View className="mt-3">
              <View className="flex-row items-center mb-1">
                <Users size={18} color="#555" />
                <Text className="ml-2 text-gray-800 font-semibold">
                  Members ({item.members.length})
                </Text>
              </View>
              <View className="flex-col px-6 flex-wrap gap-2 mt-3">
                {item.members.map((m: any, index: number) => (
                  <Text
                    key={index}
                    className={`px-4 py-1 rounded-full text-sm font-medium ${
                      roleColors[m.role] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {m.name} ({m.role})
                  </Text>
                ))}
              </View>
            </View>
          </View>
        );
      }}
    />
  );
}
