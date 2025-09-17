import "@/style/global.css";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerActions, useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { LogOut } from "lucide-react-native";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Bars3BottomLeftIcon } from "react-native-heroicons/outline";

const ios = Platform.OS === "ios";

export default function AuthNavbar() {
  const navigation = useNavigation();
  const route = useRoute();
    const { userData } = route.params || {};
    if (!userData) return <Text>Loading...</Text>;
  
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      console.log("userData?.user logged out, session cleared!");
      navigation.navigate("Home" as never);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <View className="w-full bg-blue-100">
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Bars3BottomLeftIcon size="30" color="black" strokeWidth={2} />
          </TouchableOpacity>

          <View className="flex-row items-center">
            <Text className="text-neutral-800 text-2xl font-bold mr-2">
              {userData?.user?.name
                ? userData?.user.name.charAt(0).toUpperCase() + userData?.user.name.slice(1)
                : "Guest"}
            </Text>
            <View
              style={styles.roleBox}
              className="px-2 flex-row justify-center items-center"
            >
              <Text style={styles.roleText} className="text-lg font-semibold">
                Role:
              </Text>
              <Text
                style={styles.roleText}
                className="text-lg font-semibold ml-1"
              >
                {userData?.user?.role
                  ? userData?.user.role.charAt(0).toUpperCase() + userData?.user.role.slice(1)
                  : "userData?.user"}
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={handleLogout}>
            <LogOut size="30" color="#ec8434" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  roleBox: {
    backgroundColor: "#ec8434",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  roleText: {
    color: "#fff",
  },
});
