import { loginUser } from "@/constants/api/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { User2Icon } from "lucide-react-native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  EyeIcon,
  EyeSlashIcon,
  XCircleIcon,
} from "react-native-heroicons/outline";
import Navbar from "../components/Navbar";

export default function Login() {
  const navigation = useNavigation();
  // const [email, setEmail] = useState(null);
  // const [password, setPassword] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill all the fields");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    const userData = { email, password };
    try {
      // console.log(" Email: " + email + " Password: " + password );
      const response = await loginUser({ email, password });
      // console.log(" Email: " + email + " Password: " + password + "---"+response);
      console.log("Login successful...");
      await AsyncStorage.setItem("userData", JSON.stringify(response));
      
      navigation.navigate("User");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log("Login error:", error);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <View className=" bg-blue-100 h-full w-full  pt-16">
      <View className="h-[30px] ">
        <Navbar />
      </View>
      {error ? (
        <TouchableOpacity
          className="flex-row items-center justify-between bg-red-100 border border-red-400 rounded-lg px-4 py-2 mb-3"
          onPress={() => setError("")}
        >
          <Text className="text-red-700 flex-1 mr-2 text-xl">{error}</Text>
          <XCircleIcon size={30} color="red" />
        </TouchableOpacity>
      ) : null}

      <View className="flex-col justify- items-center mt-xl pt-[90px] gap-12">
        <View className="space-y-8 w-full justify-center items-center">
          <User2Icon size={120} color="#2563eb" strokeWidth={1} />
          <Text className="text-4xl font-bold font- text-neutral-800">
            Welcome back
          </Text>
          <Text className="text-xl text-neutral-800">
            Sign in to your account to continue
          </Text>
        </View>

        <View className="h-[350px] w-[90%] flex-col justify-center items-center bg-[#f8fafc] text-star rounded-md mt-12">
          <View className="space-y-6 gap-4 w-full px-8">
            <View className="gap-1">
              <Text className="text-[#374151] text-xl text-start ">
                Email address*
              </Text>
              <TextInput
                placeholder="Enter your email..."
                value={email}
                onChangeText={setEmail}
                style={styles.emailContainer}
              />
            </View>

            <View className="gap-1">
              <Text className="text-[#7d899c] text-xl text-start ">
                Password*
              </Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.inputPassword}
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon size={20} color="gray" />
                  ) : (
                    <EyeIcon size={20} color="gray" />
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity className="items-end text-end ">
                <Text className="text-[#214276] text-xl text-end ">
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
            <View className="gap-1">
              <TouchableOpacity
                onPress={handleLogin}
                className="rounded-lg p-3 m-1 bg-blue-400 "
              >
                <Text className="text-center text-xl font-semibold">
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-center items-center gap-2">
              <Text className="text-center text-lg text-[#374151]">
                Don't have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text className="text-blue-900 text-lg">Sign up here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  error: {
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    textAlign: "center",
  },
  emailContainer: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9fafb",
  },
  inputEmail: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    backgroundColor: "#f9fafb",
  },

  inputPassword: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  inputGroup: {
    marginBottom: 15,
  },
  icon: {
    paddingHorizontal: 10,
  },
});
