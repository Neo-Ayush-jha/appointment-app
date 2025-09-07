import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
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

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState(null);

  const handleSingup = () => {
    console.log(
      "Name: " +
        name +
        " Email: " +
        email +
        " Password: " +
        password +
        " role: " +
        role
    );
    if (!name || !email || !password || !role) {
      setError("Please fill all the fields");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    navigation.navigate("Home");
    setName(null);
    setEmail(null);
    setPassword(null);
    setRole(null);
  };

  const generateRandomPassword = () => {
    const length = 12;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    setPassword(password);
  };

  return (
    <View className=" bg-gray-200 h-full w-full  pt-16">
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

      <View className="flex-col justify- items-center mt-xl pt-[75px] gap-12">
        <View className="space-y-8 w-full justify-center items-center">
          <Text className="text-4xl font-bold font- text-neutral-800">
            Create your account
          </Text>
          <Text className="text-xl text-neutral-800">
            Join us to start booking appointments
          </Text>
        </View>

        <View className="h-[500px] w-[90%] flex-col justify-center items-center bg-[#f8fafc] text-star rounded-md mt-4">
          <View className="space-y-6 gap-4 w-full px-8">
            <View className="gap-1">
              <Text className="text-[#374151] text-xl text-start ">
                Full Name*
              </Text>
              <TextInput
                placeholder="Enter your full name..."
                value={name}
                onChangeText={setName}
                style={styles.emailContainer}
              />
            </View>
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
              <TouchableOpacity
                className="items-end text-end "
                onPress={generateRandomPassword}
              >
                <Text className="text-[#214276] text-xl text-end ">
                  Suggest Password!!
                </Text>
              </TouchableOpacity>
            </View>

            <View className="gap-1">
              <Text className="text-[#7d899c] text-xl text-start ">
                Account Type*
              </Text>
              <View className="border border-gray-300 rounded-lg bg-white">
                <Picker
                  selectedValue={role}
                  onValueChange={(itemValue) => setRole(itemValue)}
                  dropdownIconColor="gray"
                >
                  <Picker.Item
                    label="Customer"
                    value="customer"
                    style={styles.select}
                  />
                  <Picker.Item
                    label="Doctor"
                    value="doctor"
                    style={styles.select}
                  />
                  <Picker.Item
                    label="Barber"
                    value="barber"
                    style={styles.select}
                  />
                </Picker>
              </View>
            </View>

            <View className="gap-1">
              <TouchableOpacity
                onPress={handleSingup}
                className="rounded-lg p-3 m-1 bg-blue-400 "
              >
                <Text className="text-center text-xl font-semibold">
                  Create account
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-center items-center gap-2">
              <Text className="text-center text-lg text-[#374151]">
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className="text-blue-900 text-lg">Sign in here</Text>
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
  select: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 6,
  },
});
