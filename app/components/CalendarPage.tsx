import { Calendar as CalendarIcon } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View
} from "react-native";
import { Calendar } from "react-native-calendars";

interface Appointment {
  id: string;
  service: string;
  status: string;
  date: string;
  time: string;
  price: number;
  duration: number;
  professional?: { name: string };
  client?: { name: string };
  customer?: { name: string };
  notes?: string;
  reschedule_date?: string;
  reschedule_time?: string;
}

export default function CalendarPage({ user }: { user: any }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dummyAppointments: Appointment[] = [
      {
        id: "1",
        service: "Haircut",
        status: "completed",
        date: new Date().toISOString().split("T")[0],
        time: "10:30 AM",
        price: 250,
        duration: 30,
        professional: { name: "Dr. John" },
      },
      {
        id: "2",
        service: "Consultation",
        status: "scheduled",
        date: new Date(new Date().setDate(new Date().getDate() + 1))
          .toISOString()
          .split("T")[0],
        time: "2:00 PM",
        price: 500,
        duration: 45,
        professional: { name: "Dr. Smith" },
      },
      {
        id: "3",
        service: "Shaving",
        status: "cancelled",
        date: new Date(new Date().setDate(new Date().getDate() + 2))
          .toISOString()
          .split("T")[0],
        time: "4:00 PM",
        price: 150,
        duration: 20,
        professional: { name: "Dr. Mike" },
      },
    ];

    setAppointments(dummyAppointments);
    setLoading(false);
  }, []);

  const getAppointmentsForDate = (date: string) =>
    appointments.filter((apt) => apt.date === date);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return { color: "green" };
      case "cancelled":
        return { color: "red" };
      case "scheduled":
        return { color: "blue" };
      default:
        return { color: "gray" };
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 bg-white w-full h-full px-8 py-8 rounded-xl mb-22 ">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center gap-2">
          <CalendarIcon size={20} color="#2563eb" />
          <Text className="text-xl font-bold text-gray-900 flex-row items-center">
            Appointments Calendar
          </Text>
        </View>
        <Text className="text-sm text-gray-500">
          Total: {appointments.length} appointments
        </Text>
      </View>

      {/* Calendar */}
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: "#2563eb" },
          ...appointments.reduce(
            (acc, apt) => {
              acc[apt.date] = { marked: true, dotColor: "#2563eb" };
              return acc;
            },
            {} as Record<string, any>
          ),
        }}
      />

      <Text className="mt-4 text-lg font-semibold text-gray-800">
        {new Date(selectedDate).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </Text>

      <FlatList
        data={getAppointmentsForDate(selectedDate)}
        keyExtractor={(item) => item.id}
        className="mt-2 bg-blue-50 p-4 rounded-lg"
        scrollEnabled={false}
        ListEmptyComponent={
          <View className="items-center py-8">
            <CalendarIcon size={40} color="gray" />
            <Text className="text-gray-500 mt-2">No Appointments Found</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View className="bg-white rounded-xl p-4 mb-3 shadow">
            <Text className="text-lg font-semibold">
              {item.service.charAt(0).toUpperCase() + item.service.slice(1)}
            </Text>
            <Text className="text-gray-600">
              with{" "}
              {user?.role === "customer"
                ? item.professional?.name
                : item.client?.name || item.customer?.name}
            </Text>

            <View className="flex-row justify-between mt-2">
              <View>
                <Text className="font-medium">
                  {new Date(item.date).toLocaleDateString()}
                </Text>
                <Text className="text-gray-500">{item.time}</Text>
              </View>

              <View>
                <Text style={getStatusColor(item.status)}>{item.status}</Text>
                <Text className="text-gray-500">
                  {item.duration} min | ₹{item.price}
                </Text>
              </View>
            </View>

            {item.notes && (
              <Text className="mt-2 text-gray-600">Notes: {item.notes}</Text>
            )}
            {item.reschedule_date && item.reschedule_time && (
              <Text className="mt-2 text-yellow-700">
                Reschedule Requested: {item.reschedule_date} at{" "}
                {item.reschedule_time}
              </Text>
            )}
          </View>
        )}
      />
    </View>
  );
}
