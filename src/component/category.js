import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Colors, categoryItems, image } from "../const";

const Categories = ({ activeCategory, setActiveCategory }) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categoryItems.CATEGORIES.map((category, index) => {
          const isActive = activeCategory === category.name;

          return (
            <View key={index} style={styles.categoryContainer}>
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  isActive && styles.activeCategoryButton,
                ]}
                onPress={() => setActiveCategory(category.name)}
              >
                <Image style={styles.Image} source={image[category.logo]} />
              </TouchableOpacity>
              <Text
                style={[styles.categoryText, isActive && styles.activeText]}
              >
                {category.mon}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    padding: 10,
    marginTop: 10,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryButton: {
    padding: 5,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    backgroundColor: "#D1D5DB",
  },
  activeCategoryButton: {
    backgroundColor: "#4B5563",
    //backgroundColor: Colors.DEFAULT_GREEN
  },
  categoryText: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: "Comfortaa-Bold",

    //fontWeight: "bold",
  },
  activeText: {
    fontWeight: 600,
  },
  Image: {
    width: 45,
    height: 45,
  },
});

export default Categories;
