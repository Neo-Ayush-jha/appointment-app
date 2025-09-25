import { PenSquareIcon, Trash2Icon } from "lucide-react-native";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

export default function ViewAppointmentDetail({
  isVisible,
  onClose,
  appointment,
  userDetails,
}) {
  if (!isVisible || !appointment) {
    return null;
  }
  const formatAppointmentDuration = (duration) => {
    const minutes = Number(duration);
    if (isNaN(minutes) || minutes <= 0) {
      return "N/A";
    }
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;

      let parts = [];
      if (hours > 0) {
        parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
      }
      if (remainingMinutes > 0) {
        parts.push(`${remainingMinutes} min`);
      }
      return parts.join(" and ");
    }
    return `${minutes} min`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 h-full w-full justify-center items-center bg-black/50">
        <View className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
          <Text className="text-xl font-bold mb-4">Appointment Details</Text>
          <View className="space-y-2 gap-4">
            <View className="flex-row justify-between">
              <Text className="font-semibold text-xl text-gray-700">
                User name:
              </Text>
              <Text className="text-gray-600 text-xl">
                {appointment?.user?.name || "N/A"}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-semibold text-xl text-gray-700">
                Service:
              </Text>
              <Text className="text-gray-600 text-xl">
                {appointment.service}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-semibold text-xl text-gray-700">
                {userDetails?.user?.role === "customer"
                  ? "Professional:"
                  : "Customer:"}
              </Text>
              <Text className="text-gray-600 text-xl">
                {appointment?.professional?.name || "N/A"}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-semibold text-xl text-gray-700">Date:</Text>
              <Text className="text-gray-600 text-xl">
                {formatDate(appointment.date)}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-semibold text-xl text-gray-700">Time:</Text>
              <Text className="text-gray-600 text-xl">{appointment.time}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-semibold text-xl text-gray-700">
                Duration:
              </Text>
              <Text className="text-gray-600 text-xl">
                {formatAppointmentDuration(appointment.duration)}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-semibold text-xl text-gray-700">
                Price:
              </Text>
              <Text className="text-gray-600 text-xl">₹ {appointment.price}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-semibold text-xl text-gray-700">
                Status:
              </Text>
              <Text className="text-gray-600 text-xl">
                {appointment.status}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-semibold text-xl text-gray-700">
                Action:
              </Text>
              <View className="flex-1 flex-row items-center justify-end space-x-2 gap-2">
                <TouchableOpacity>
                  <PenSquareIcon size={20} color="#3b82f6" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Trash2Icon size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={onClose}
            className="mt-6 bg-blue-500 rounded-md py-2 px-4"
          >
            <Text className="text-white font-semibold text-xl text-center">
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
