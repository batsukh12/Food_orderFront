import React, { useEffect } from "react";
import { View, Text } from "react-native";
const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Welcome");
    }, 3000);
  });
  return (
    <View>
      <Text>Dady uuu</Text>
    </View>
  );
};
export default HomeScreen;
