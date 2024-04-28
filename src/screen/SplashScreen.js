import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
} from "react-native";
import { Colors, Fonts } from "../const";
import LottieView from "lottie-react-native";

const { height, width } = Dimensions.get("window");
const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Welcome");
    }, 3000);
  });

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.DEFAULT_BLACK}
        translucent
      />
      {/* <Image source={Images.PLATE} resizeMode="contain" style={styles.image} /> */}
      <LottieView
        source={require("../assets/animation/welcome.json")}
        style={styles.animation}
        autoPlay
        loop
      />
      <Text style={styles.titleText}>Delicious</Text>
    </View>
  );
};
export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  image: {
    height: setHeight(30),
    width: setWidth(60),
  },
  titleText: {
    color: Colors.DEFAULT_YELLOW,
    fontSize: 32,
    fontFamily: "POPPINS-BLACK",
  },
  animation: {
    width: setWidth(60),
    height: setHeight(30),
  },
});
