import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./src/screen/SplashScreen";
import WelcomeScreen from "./src/screen/WelcomeScreen";
import SignScreen from "./src/screen/SignScreen";
import { SafeAreaView } from "react-native";
import Register from "./src/screen/Register";
import ForgotPasswordScreen from "./src/screen/ForgotPassScreen";
import HomeScreen from "./src/screen/HomeScreen";
import { useSelector, useDispatch } from "react-redux";
import { GeneralAction } from "./src/actions";
import RestaurantScreen from "./src/screen/RestaurantScreen";
import bottomBars from "./src/component/bottomBars";
import FoodScreen from "./src/screen/FoodScreen";
const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { isLoading, token, isFirst } = useSelector(
    (state) => state?.generalState
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the action only when the component mounts
    dispatch(GeneralAction.appStart());
  }, [dispatch]);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* <Stack.Screen name="Home" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignIn" component={SignScreen} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPass" component={ForgotPasswordScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}

        {isLoading ? (
          <Stack.Screen name="Home" component={SplashScreen} />
        ) : !token ? (
          <>
            {isFirst && (
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
            )}
            <Stack.Screen name="SignIn" component={SignScreen} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgotPass" component={ForgotPasswordScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="bottomBars" component={bottomBars} />
            <Stack.Screen name="Restaurant" component={RestaurantScreen} />
            <Stack.Screen name="Food" component={FoodScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
