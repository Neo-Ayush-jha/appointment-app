import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function EmailVarifyPopUp({
  setSuccessModal,
  successModal,
  navigation,
}) {
  return (
    <Modal visible={successModal} transparent animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text className="text-2xl font-bold mb-4 text-center text-green-700">
            Signup Successful 🎉
          </Text>
          <Text className="text-lg text-center mb-6 text-gray-800">
            Please go to your mail and verify your account.
          </Text>
          <TouchableOpacity
            onPress={() => {
              setSuccessModal(false);
              navigation.navigate("Home");
            }}
            className="bg-blue-500 rounded-lg px-6 py-3"
          >
            <Text className="text-white text-lg font-semibold text-center">
              Go to Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 12,
    width: "85%",
    alignItems: "center",
    elevation: 10,
  },
});
