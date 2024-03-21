import React from "react";
import { View, StyleSheet, Text, Image, Dimensions } from "react-native";
import { image, Fonts } from "../const";

const { height, width } = Dimensions.get("window");

const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

const WelcomeCard = ({ img, title, desc }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={image[img]} resizeMode="contain" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{desc}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: setWidth(100),
  },
  image: {
    height: setHeight(60),
    width: setWidth(90),
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.POPPINS_BOLD,
  },
  desc: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 18,
    fontFamily: Fonts.POPPINS_LIGHT,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

export default WelcomeCard;
