import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./src/screen/SplashScreen";
import WelcomeScreen from "./src/screen/WelcomeScreen";
import SignScreen from "./src/screen/SignScreen";
import { SafeAreaView } from "react-native"; // Import SafeAreaView
import Register from "./src/screen/Register";
import ForgotPasswordScreen from "./src/screen/ForgotPassScreen";
import HomeScreen from "./src/screen/HomeScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={SplashScreen}></Stack.Screen>
        <Stack.Screen name="Welcome" component={WelcomeScreen}></Stack.Screen>
        <Stack.Screen name="SignIn" component={SignScreen}></Stack.Screen>
        <Stack.Screen name="Register" component={Register}></Stack.Screen>
        <Stack.Screen
          name="ForgotPass"
          component={ForgotPasswordScreen}
        ></Stack.Screen>
        <Stack.Screen name="HomeScreen" component={HomeScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
