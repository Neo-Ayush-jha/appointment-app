import "@/style/global.css";
import React from "react";
import { ScrollView } from "react-native";
import HeroSection from "./HeroSection";
import SecondSection from "./SecondSection";
export default function HomeBar() {
  return (
    <ScrollView className="flex-col bg-blue-50">
      <HeroSection />
      <SecondSection/>
    </ScrollView>
  );
}
