import { callAllUser, createAppointment } from "@/constants/api/User";
import { useRoute } from "@react-navigation/native";
import { Minus, Plus, X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface CreateAppointmentModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function CreateAppointmentModal({
  isVisible,
  onClose,
}: CreateAppointmentModalProps) {
  const [selectedRole, setSelectedRole] = useState<"doctor" | "barber" | "">(
    ""
  );
  const [professionals, setProfessionals] = useState<any[]>([]);
  const [professionalId, setProfessionalId] = useState<number | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [duration, setDuration] = useState<number>(10);
  const [notes, setNotes] = useState("");
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const price = duration * 15;
  const route = useRoute();

  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await callAllUser();
        if (response?.users) {
          setUsers(response.users);
        }
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  //   console.log("Route params:", route?.params?.userData?.token);
  //   const users = route?.params?.userData?.user || [];
  const handleRoleChange = (role: "doctor" | "barber") => {
    setSelectedRole(role);
    const roleUsers = users.filter((u) => u.role === role);
    setProfessionals(roleUsers);
    setProfessionalId(null);
  };

  const increaseDuration = () => setDuration((d) => d + 1);
  const decreaseDuration = () => {
    if (duration > 10) setDuration((d) => d - 1);
  };

  const handleSubmit = async () => {
    if (!selectedRole || !professionalId || !date || !time) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    const appointmentData = {
      professional_id: professionalId,
      date: date.toISOString().split("T")[0],
      time: time.toTimeString().slice(0, 5),
      service: selectedRole,
      duration,
      price,
      notes,
    };
    const resetForm = () => {
      setProfessionalId(null);
      setDate(null);
      setTime(null);
      setDuration(10);
      setNotes("");
      setDatePickerVisible(false);
      setTimePickerVisible(false);
      setLoading(false);
    };
    try {
      setLoading(true);
      await createAppointment(appointmentData, route?.params?.userData?.token);
      onClose();
      resetForm();
      Alert.alert("Success", "Appointment booked successfully!");
    } catch (err: any) {
      Alert.alert("Error", err || "Failed to create appointment");
    } finally {
      setLoading(false);
    }
  };

  const formattedDate = date ? date.toLocaleDateString("en-GB") : "";
  const formattedTime = time
    ? time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "";

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      {loading ? (
        <View className="flex-1 justify-center items-center bg-yellow-200">
          <Text className="text-6xl font-bold text-center text-gray-800">
            Loading...
          </Text>
        </View>
      ) : (
        <View className="flex-1 justify-center items-center bg-black/50 px-4">
          <View className="bg-white rounded-lg w-full p-6 shadow-xl max-w-lg">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-4 border-b border-gray-200 pb-2">
              <Text className="text-xl font-bold text-gray-900">
                Book Appointment
              </Text>
              <TouchableOpacity onPress={onClose}>
                <X size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Role */}
              <Text className="text-gray-700 font-medium mb-1">
                Select Role
              </Text>
              <View className="flex-row space-x-2 mb-4 gap-4">
                {["doctor", "barber"].map((role) => (
                  <TouchableOpacity
                    key={role}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedRole === role
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-300"
                    }`}
                    onPress={() =>
                      handleRoleChange(role as "doctor" | "barber")
                    }
                  >
                    <Text
                      className={`${
                        selectedRole === role ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Professional */}
              {selectedRole ? (
                <>
                  <Text className="text-gray-700 font-medium mb-1">
                    Select Professional
                  </Text>
                  <ScrollView className="max-h-44 mb-6 border rounded-lg ">
                    {professionals.map((pro) => (
                      <TouchableOpacity
                        key={pro.id}
                        className={`py-3 px-6  border-b ${
                          professionalId === pro.id ? "bg-blue-100" : "bg-white"
                        }`}
                        onPress={() => setProfessionalId(pro.id)}
                      >
                        <Text className="text-gray-800 text-md font-semibold ">
                          {pro.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </>
              ) : null}

              {/* Date & Time */}
              <Text className="text-gray-700 font-medium mb-1">Date</Text>
              <TouchableOpacity
                onPress={() => setDatePickerVisible(true)}
                className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
              >
                <Text>{formattedDate || "Select a date"}</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={(d) => {
                  setDate(d);
                  setDatePickerVisible(false);
                }}
                onCancel={() => setDatePickerVisible(false)}
              />

              <Text className="text-gray-700 font-medium mb-1">Time</Text>
              <TouchableOpacity
                onPress={() => setTimePickerVisible(true)}
                className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
              >
                <Text>{formattedTime || "Select a time"}</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={(t) => {
                  setTime(t);
                  setTimePickerVisible(false);
                }}
                onCancel={() => setTimePickerVisible(false)}
              />

              {/* Duration & Price */}
              <View className="flex-row justify-between mb-4">
                <View className="flex-1 mr-2">
                  <Text className="text-gray-700 font-medium mb-1">
                    Duration (min)
                  </Text>
                  <View className="flex-row items-center border rounded-lg px-2 py-1">
                    <TouchableOpacity onPress={decreaseDuration}>
                      <Minus size={20} color="#000" />
                    </TouchableOpacity>
                    <Text className="flex-1 text-center">{duration}</Text>
                    <TouchableOpacity onPress={increaseDuration}>
                      <Plus size={20} color="#000" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View className="flex-1 ml-2">
                  <Text className="text-gray-700 font-medium mb-1">
                    Price (₹)
                  </Text>
                  <View className="border rounded-lg px-4 py-2 bg-gray-100">
                    <Text className="text-gray-900">{price}</Text>
                  </View>
                </View>
              </View>

              {/* Notes */}
              <Text className="text-gray-700 font-medium mb-1">Notes</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-2 mb-6"
                placeholder="Any special requests..."
                multiline
                value={notes}
                onChangeText={setNotes}
              />

              {/* Buttons */}
              <View className="flex-row justify-end space-x-3 gap-4">
                <TouchableOpacity
                  onPress={onClose}
                  className="px-4 py-2 rounded-lg border border-gray-300"
                >
                  <Text className="text-gray-700">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-blue-500"
                >
                  <Text className="text-white">
                    {loading ? "Booking..." : "Book"}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </Modal>
  );
}
