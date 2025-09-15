import "@/style/global.css";
import {
  createDrawerNavigator
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Toast from "react-native-toast-message";

import AboutScreen from "@/app/screens/AboutScreen";
import AppointmentsScreen from "@/app/screens/AppointmentsScreen";
import HomeScreen from "@/app/screens/HomeScreen";
import Login from "@/app/screens/LoginScreen";
import OrganizationScreen from "@/app/screens/OrganizationScreen";
import SignUpScreen from "@/app/screens/SignUpScreen";
import User from "@/app/screens/User";
import SideNavbar from "../components/SideNavbar";
import ClientScreen from "../screens/ClientScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
   return <SideNavbar {...props} />;
}

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="User"
        component={User}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function Index() {
  return (
    <>
      <Drawer.Navigator
        screenOptions={{ headerShown: false }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Dashboard" component={StackNavigation} />
        <Drawer.Screen name="About" component={AboutScreen} />
        <Drawer.Screen name="Appointments" component={AppointmentsScreen} />
        <Drawer.Screen
          name="Client"
          component={ClientScreen}
        />
        <Drawer.Screen
          name="Organization"
          component={OrganizationScreen}
        />
      </Drawer.Navigator>
      <Toast />
    </>
  );
}