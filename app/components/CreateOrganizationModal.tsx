import { X } from "lucide-react-native";
import React, { useState } from "react";
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
// Import the new library
import { createOrganization } from "@/constants/api/User";
import { useRoute } from "@react-navigation/native";
import CountryPicker from "react-native-country-picker-modal";

export default function CreateOrganizationModal({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) {
  const route = useRoute();
  const [organizationName, setOrganizationName] = useState("");
  const [description, setDescription] = useState("");
  const [establishedDate, setEstablishedDate] = useState<Date | null>(null);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState({
    cca2: "IN",
    callingCode: ["91"],
  });
  const [errors, setErrors] = useState({});
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const validateForm = () => {
    let newErrors = {};

    if (!organizationName.trim()) {
      newErrors.organizationName = "Organization Name is required.";
    }
    if (!description.trim()) {
      newErrors.description = "Description is required.";
    }
    if (!establishedDate) {
      newErrors.establishedDate = "Established Date is required.";
    }
    if (!address.trim()) {
      newErrors.address = "Address is required.";
    }
    if (!phoneNumber.trim() || phoneNumber.length < 10) {
      newErrors.phoneNumber = "Phone Number must be at least 10 digits.";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async () => {
    if (validateForm()) {
      try {
        const payload = {
          name: organizationName,
          description: description,
          established_date: establishedDate?.toISOString(),
          address: address,
          phone: `${country.callingCode[0]}${phoneNumber}`,
          email: email,
        };
        // console.log("Payload for API:", payload);
        const response = await createOrganization(
          payload,
          route.params.userData?.token
        );

        if (response.success) {
          Alert.alert("Success", "Organization created successfully!");
          onClose();
        } else {
          Alert.alert(
            "Error",
            response.message || "Failed to create organization."
          );
        }
      } catch (error) {
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
        console.error("API call failed:", error);
      } finally {
      }
    }
  };

  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);
  const handleConfirmDate = (date) => {
    setEstablishedDate(date);
    hideDatePicker();
  };

  const handleEmailChange = (text) => {
    const lowercasedText = text.toLowerCase();
    if (lowercasedText && !lowercasedText.includes("@")) {
      setEmail(`${lowercasedText}@gmail.com`);
    } else {
      setEmail(lowercasedText);
    }
  };

  const formattedDate = establishedDate
    ? establishedDate.toLocaleDateString("en-GB")
    : "";

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50 px-4 h-full py-8">
        <View className="bg-white rounded-lg w-full p-6 shadow-xl max-w-lg">
          <View className="flex-row justify-between items-center mb-4 border-b border-gray-200 pb-[100px]">
            <Text className="text-xl font-bold text-gray-900">
              Create New Organization
            </Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            className="pb-[100px]"
          >
            {/* Organization Name */}
            <Text className="text-gray-700 font-medium mb-1">
              Organization Name
            </Text>
            <TextInput
              className={`border rounded-lg px-4 py-2 mb-1 ${
                errors.organizationName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter organization name"
              value={organizationName}
              onChangeText={setOrganizationName}
            />
            {errors.organizationName && (
              <Text className="text-red-500 text-xs mb-4">
                {errors.organizationName}
              </Text>
            )}

            {/* Description */}
            <Text className="text-gray-700 font-medium mb-1">Description</Text>
            <TextInput
              className={`border rounded-lg px-4 py-2 mb-1 h-24 text-top ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Describe your organization"
              multiline
              textAlignVertical="top"
              value={description}
              onChangeText={setDescription}
            />
            {errors.description && (
              <Text className="text-red-500 text-xs mb-4">
                {errors.description}
              </Text>
            )}

            {/* Established Date */}
            <Text className="text-gray-700 font-medium mb-1">
              Established Date
            </Text>
            <TouchableOpacity onPress={showDatePicker}>
              <View
                className={`flex-row items-center border rounded-lg px-4 py-2 mb-1 ${
                  errors.establishedDate ? "border-red-500" : "border-gray-300"
                }`}
              >
                <TextInput
                  className="flex-1 text-gray-900"
                  placeholder="dd-mm-yyyy"
                  value={formattedDate}
                  editable={false}
                />
              </View>
            </TouchableOpacity>
            {errors.establishedDate && (
              <Text className="text-red-500 text-xs mb-4">
                {errors.establishedDate}
              </Text>
            )}
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirmDate}
              onCancel={hideDatePicker}
            />

            {/* Address */}
            <Text className="text-gray-700 font-medium mb-1">Address</Text>
            <TextInput
              className={`border rounded-lg px-4 py-2 mb-1 h-24 text-top ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter complete address"
              multiline
              textAlignVertical="top"
              value={address}
              onChangeText={setAddress}
            />
            {errors.address && (
              <Text className="text-red-500 text-xs mb-4">
                {errors.address}
              </Text>
            )}

            <View className="flex-col justify-between space-x-2 gap-2 pb-4">
              {/* Phone Number */}
              <View className="flex-1">
                <Text className="text-gray-700 font-medium mb-1">
                  Phone Number
                </Text>
                <View
                  className={`flex-row items-center border rounded-lg ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <CountryPicker
                    withFilter
                    withFlag
                    withCallingCode
                    onSelect={(selectedCountry) => {
                      setCountry(selectedCountry);
                    }}
                    countryCode={country.cca2}
                    containerButtonStyle={{
                      paddingHorizontal: 10,
                      height: 48,
                      justifyContent: "center",
                    }}
                  />
                  <Text className="text-gray-900 pr-2">
                    +{country.callingCode[0]}
                  </Text>
                  <TextInput
                    className="flex-1 px-2 py-2"
                    placeholder="Phone number"
                    keyboardType="numeric"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                  />
                </View>
                {errors.phoneNumber && (
                  <Text className="text-red-500 text-xs mt-1">
                    {errors.phoneNumber}
                  </Text>
                )}
              </View>

              {/* Email */}
              <View className="flex-1">
                <Text className="text-gray-700 font-medium mb-1">Email</Text>
                <TextInput
                  className={`border rounded-lg px-4 py-2 mb-1 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="contact@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={handleEmailChange}
                />
                {errors.email && (
                  <Text className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </Text>
                )}
              </View>
            </View>
          </ScrollView>

          {/* Footer Buttons */}
          <View className="flex-row justify-end gap-4 items-center mt-6">
            <TouchableOpacity onPress={onClose}>
              <Text className="text-gray-700 font-medium">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCreate}
              className={`px-6 py-3 rounded-lg ${
                Object.keys(errors).length === 0 &&
                !!organizationName &&
                !!description &&
                !!establishedDate &&
                !!address &&
                !!phoneNumber &&
                !!email
                  ? "bg-blue-600"
                  : "bg-gray-400"
              }`}
              disabled={
                !(
                  Object.keys(errors).length === 0 &&
                  !!organizationName &&
                  !!description &&
                  !!establishedDate &&
                  !!address &&
                  !!phoneNumber &&
                  !!email
                )
              }
            >
              <Text className="text-white font-semibold">
                Create Organization
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
