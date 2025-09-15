import React from "react";
import { Text, View } from "react-native";

export default function WelcomeScetion({user}: {user: any}) {
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 0 && hour < 5) return "Good night 🌙";
    if (hour >= 5 && hour < 12) return "Good morning ☀️";
    if (hour >= 12 && hour < 17) return "Good afternoon 🌤️";
    if (hour >= 17 && hour < 21) return "Good evening 🌇";
    return "Good night 🌙";
  };

  return (
    <View className="flex-col w-full  items-start justify-center bg-blue-600 rounded-lg shadow-md px-8 py-6 gap-2">
      <Text className="text-3xl text-white font-bold">{ getGreeting()} {", "}{user?.name} {"!"}</Text>
      <Text className="text-white mt-2 text-xl">Welcome back to our app. We're glad to see you again!</Text>
    </View>
  );
}
