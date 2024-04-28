import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Fonts } from "../const";

const CategoryList = ({ name, isActive, selectCategory }) => {
  return (
    <View style={styles.container}>
      <Text
        style={
          isActive ? styles.activeCategoryText : styles.inActiveCategoryText
        }
        onPress={() => selectCategory(name)}
      >
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.LIGHT_YELLOW,
    paddingHorizontal: 15,
    height: 50,
    justifyContent: "center",
  },
  activeCategoryText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: "Poppins-Bold",
    color: Colors.DEFAULT_BLACK,
  },
  inActiveCategoryText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: "Poppins-SemiBold",
    color: Colors.INACTIVE_GREY,
  },
});

export default CategoryList;
