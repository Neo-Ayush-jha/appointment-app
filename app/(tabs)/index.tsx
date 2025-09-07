import "@/style/global.css";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import Login from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";

const Stack = createNativeStackNavigator();

const TabNavigation = () => {
  return (
    // <Stack.Navigator >
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default function Index() {
  return <TabNavigation />;
}
