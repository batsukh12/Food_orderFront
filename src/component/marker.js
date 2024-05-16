// CustomMarker.js
import React from "react";
import { Image, View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const CustomMarker = ({ coordinate, title, image }) => {
  return (
    <Marker coordinate={coordinate} title={title}>
      <View style={styles.markerContainer}>
        <Image source={image} style={styles.markerImage} />
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  markerImage: {
    width: 40, // Set your desired width
    height: 40, // Set your desired height
    resizeMode: "contain", // Ensure the image scales properly
    borderRadius: 50,
  },
});

export default CustomMarker;
