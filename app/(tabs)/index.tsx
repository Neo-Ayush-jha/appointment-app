import "@/style/global.css";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

import AboutScreen from "@/app/screens/AboutScreen";
import AppointmentsScreen from "@/app/screens/AppointmentsScreen";
import HomeScreen from "@/app/screens/HomeScreen";
import Login from "@/app/screens/LoginScreen";
import OrganizationScreen from "@/app/screens/OrganizationScreen";
import SignUpScreen from "@/app/screens/SignUpScreen";
import User from "@/app/screens/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SideNavbar from "../components/SideNavbar";
import ClientScreen from "../screens/ClientScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent({ userData, ...props }: any) {
  return <SideNavbar userData={userData} {...props} />;
}

const StackNavigation = ({ route }: any) => {
  const { userData } = route.params || {};
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ userData }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        initialParams={{ userData }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        initialParams={{ userData }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="User"
        component={User}
        initialParams={{ userData }}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function Index() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const stored = await AsyncStorage.getItem("userData");
      if (stored) {
        setUserData(JSON.parse(stored));
      }
    };
    getUserData();
  }, []);

  

  return (
    <>
      <Drawer.Navigator
        screenOptions={{ headerShown: false }}
        drawerContent={(props) => (
          <CustomDrawerContent {...props} userData={userData} />
        )}
      >
        <Drawer.Screen
          name="Dashboard"
          component={StackNavigation}
          initialParams={{ userData }}
        />
        <Drawer.Screen
          name="About"
          component={AboutScreen}
          initialParams={{ userData }}
        />
        <Drawer.Screen
          name="Appointments"
          component={AppointmentsScreen}
          initialParams={{ userData }}
        />
        <Drawer.Screen
          name="Client"
          component={ClientScreen}
          initialParams={{ userData }}
        />
        <Drawer.Screen
          name="Organization"
          component={OrganizationScreen}
          initialParams={{ userData }}
        />
      </Drawer.Navigator>
      <Toast />
    </>
  );
}
