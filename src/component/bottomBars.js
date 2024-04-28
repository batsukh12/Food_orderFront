import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from "../const";
import { Dimensions } from "react-native";
import HomeScreen from "../screen/HomeScreen";
import CartScreen from "../screen/CartScreen";
import BookmarkScreen from "../screen/bookmarkScreen";
import AccountScreen from "../screen/AccountScreen";
import MapScreen from "../screen/trackMap";

const BottomTabs = createBottomTabNavigator();
const { height, width } = Dimensions.get("window");

const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

export default () => (
  <BottomTabs.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        position: "absolute",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        height: setHeight(8),
        backgroundColor: Colors.DEFAULT_WHITE,
        borderTopWidth: 0,
      },
      tabBarShowLabel: false,
      tabBarActiveTintColor: Colors.DEFAULT_GREEN,
      tabBarInactiveTintColor: Colors.INACTIVE_GREY,
    }}
    op
  >
    <BottomTabs.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name="home-outline" size={23} color={color} />
        ),
      }}
    />
    <BottomTabs.Screen
      name="Cart"
      component={CartScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name="cart-outline" size={23} color={color} />
        ),
      }}
    />

    <BottomTabs.Screen
      name="Map"
      component={MapScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name="map-outline" size={23} color={color} />
        ),
      }}
    />
    <BottomTabs.Screen
      name="Bookmark"
      component={BookmarkScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name="bookmark-outline" size={23} color={color} />
        ),
      }}
    />

    <BottomTabs.Screen
      name="Account"
      component={AccountScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name="person-outline" size={23} color={color} />
        ),
      }}
    />
  </BottomTabs.Navigator>
);
