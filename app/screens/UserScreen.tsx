import React, { useState } from "react";
import { ScrollView, Text } from "react-native";
import Calendar from "../components/CalendarPage";
import RecentBookingList from "../components/RecentBookingList";
import UserCards from "../components/UserCards";
import WelcomeScetion from "../components/WelcomeScetion";

export default function UserScreen({ user }: { user: any }) {
  const [userData, setUserData] = useState(user);

  if (!userData) return <Text>Loading...</Text>;

  return (
    <ScrollView
      className=" w-full px-2 h-full flex-col gap-16  pt-2 pb-18"
      contentContainerStyle={{
        alignItems: "center",
        gap: 32,
      }}
    >
      <WelcomeScetion user={userData.user} />
      <UserCards user={userData.user} />
      <Calendar user={userData.user} />
      <RecentBookingList user={userData.user} />
    </ScrollView>
  );
}
