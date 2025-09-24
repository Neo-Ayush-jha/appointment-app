import { Building, Calendar, Mail, Phone, Users } from "lucide-react-native";
import React from "react";
import { FlatList, Text, View } from "react-native";

export default function OrganizationCard() {
  const data = [
    {
      id: 1,
      name: "Apollo Hospitals",
      description:
        "A leading multi-specialty hospital chain in India providing healthcare services.",
      address:
        "No. 21, Greams Lane, Off Greams Road, Chennai, Tamil Nadu, India",
      phone: "+91-44-28293333",
      email: "info@apollohospitals.com",
      est: "12/5/1983",
      members: [
        { name: "Dr. Smriti", role: "doctor" },
        { name: "Dr. Aman", role: "doctor" },
      ],
    },
    {
      id: 2,
      name: "Naturals Salon & Spa",
      description:
        "One of the largest salon and spa chains in India, offering beauty and grooming services.",
      address:
        "No. 1, First Floor, Shanti Colony, Anna Nagar, Chennai, Tamil Nadu",
      phone: "+91-44-43525555",
      email: "care@naturals.in",
      est: "1/1/2000",
      members: [{ name: "Ayush", role: "barber" }],
    },
  ];

  const roleColors = {
    doctor: "bg-blue-100 text-blue-700",
    barber: "bg-green-100 text-green-700",
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <View className="w-full bg-white flex-col gap-1 rounded-xl shadow-md p-6 mb-4 ">
          {/* Title + ID */}
          <Text className="text-xl font-bold text-gray-900">{item.name}</Text>
          <Text className="text-gray-500 text-sm">ID: {item.id}</Text>

          {/* Description */}
          <Text className="text-gray-700 mt-2 text-lg">{item.description}</Text>

          {/* Address */}
          <View className="flex-row mt-3 gap-2  justify-start items-center">
            <Building size={18} color="#555" />
            <Text className=" text-gray-600 flex-1 text-lg">
              {item.address}
            </Text>
          </View>

          {/* Phone */}
          <View className="flex-row mt-3 gap-2  justify-start items-center">
            <Phone size={18} color="#555" />
            <Text className="ml-2 text-gray-600">{item.phone}</Text>
          </View>

          {/* Email */}
          <View className="flex-row mt-3 gap-2  justify-start items-center">
            <Mail size={18} color="#555" />
            <Text className="ml-2 text-gray-600">{item.email}</Text>
          </View>

          {/* Est. Date */}
          <View className="flex-row mt-3 gap-2  justify-start items-center">
            <Calendar size={18} color="#555" />
            <Text className="ml-2 text-gray-600">Established. {item.est}</Text>
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
              {item.members.map((m, index) => (
                <Text
                  key={index}
                  className={`px-4 py-1 rounded-full text-sm font-medium ${roleColors[m.role]}`}
                >
                  {m.name}({m.role})
                </Text>
              ))}
            </View>
          </View>
        </View>
      )}
    />
  );
}
