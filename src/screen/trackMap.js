import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, image } from "../const";
import { Separator, CustomMarker } from "../component";

const API_KEY = "AIzaSyDAPJJOL7sl5vJKWfUf0RwWDHa3ODH85UA";

const MapScreen = ({ navigation }) => {
  const initialRegion = {
    latitude: 47.918224,
    longitude: 106.917164,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };

  const [currentLocation, setCurrentLocation] = useState(initialRegion);
  const [kfcPlaces, setKfcPlaces] = useState([]);
  const [pizzaHutPlaces, setPizzaHutPlaces] = useState([]);
  const [burgerKingPlaces, setBurgerKingPlaces] = useState([]);

  useEffect(() => {
    searchNearbyPlaces();
  }, []);

  const searchNearbyPlaces = async () => {
    try {
      const keywords = [
        { keyword: "KFC", setter: setKfcPlaces },
        { keyword: "Pizza Hut", setter: setPizzaHutPlaces },
        { keyword: "Burger King", setter: setBurgerKingPlaces },
      ];

      for (let { keyword, setter } of keywords) {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentLocation.latitude},${currentLocation.longitude}&radius=2000&keyword=${keyword}&key=${API_KEY}`
        );

        if (response.data.results) {
          const filteredResults = response.data.results.filter((place) =>
            place.name.includes(keyword)
          );

          setter(filteredResults);
        }
      }
    } catch (error) {
      console.error("Error fetching nearby places:", error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" translucent />
      <Separator height={StatusBar.currentHeight} />

      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Ойролцоох газрууд</Text>
      </View>

      <MapView
        style={styles.map}
        region={currentLocation}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        <Marker coordinate={currentLocation} title="Current Location" />

        {kfcPlaces.map((place) => (
          <CustomMarker
            key={place.place_id}
            coordinate={{
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng,
            }}
            title={place.name}
            image={image.kfc}
          />
        ))}

        {pizzaHutPlaces.map((place) => (
          <CustomMarker
            key={place.place_id}
            coordinate={{
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng,
            }}
            title={place.name}
            image={image.pizzahut}
          />
        ))}

        {burgerKingPlaces.map((place) => (
          <CustomMarker
            key={place.place_id}
            coordinate={{
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng,
            }}
            title={place.name}
            image={image.burgerking}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Comfortaa-Bold",
    lineHeight: 20 * 1.4,
    width: "80%",
    textAlign: "center",
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
