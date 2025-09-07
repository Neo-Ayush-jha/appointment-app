import "@/style/global.css";
import { useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Bars3BottomLeftIcon,
  UserCircleIcon,
} from "react-native-heroicons/outline";
const ios = Platform.OS === "ios";

export default function Navbar() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 w-full ">
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Bars3BottomLeftIcon size="30" color="black" strokeWidth={2} />
          </TouchableOpacity>
          <Text className="text-neutral-800 text-3xl font-bold ">
            Appointment <Text style={styles.text}>Booking</Text>
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <UserCircleIcon size="30" color="#ec8434" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    backgroundColor: "#ec8434",
  },
});
