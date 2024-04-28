import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const { height: screenHeight } = Dimensions.get("window");

const ShowMap = ({ visible, onClose, heightPercentage = 0.75 }) => {
  // Calculate the modal height
  const modalHeight = screenHeight * heightPercentage;

  // Initial region centered at Ulaanbaatar, Mongolia
  const initialRegion = {
    latitude: 47.853623,
    longitude: 106.77835,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handlePlaceSelect = (data, details) => {
    if (details) {
      setSelectedPlace({
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
        name: details.name,
      });
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { height: modalHeight }]}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Хүргэлтийн хаяг </Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>Хаах </Text>
            </TouchableOpacity>
          </View>
          {/* MapView */}
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={initialRegion}
            showsMyLocationButton
          >
            <Marker coordinate={initialRegion} title="Home" pinColor="red" />
          </MapView>
          {/* Display marker for the selected place */}
          {selectedPlace && (
            <Marker
              coordinate={{
                latitude: selectedPlace.latitude,
                longitude: selectedPlace.longitude,
              }}
              title={selectedPlace.name}
            />
          )}

          <GooglePlacesAutocomplete
            placeholder="Хайх..."
            onPress={handlePlaceSelect}
            query={{
              key: "YOUR_GOOGLE_MAPS_API_KEY",
              language: "en",
              components: "country:mn",
            }}
            fetchDetails={true}
            styles={styles.autocomplete}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ShowMap;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 5,
  },
  headerContainer: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Comfortaa-Bold",
  },
  closeButton: {
    color: "blue",
    fontWeight: "bold",
    fontFamily: "Comfortaa-Bold",
  },
  map: {
    flex: 1,
  },
  autocomplete: {
    container: {
      position: "absolute",
      top: 70,
      right: 15,
      left: 15,
      width: "90%",
      zIndex: 1000,
    },
    textInput: {
      height: 40,
      borderRadius: 5,
      padding: 5,
      borderWidth: 1,
      borderColor: "#ccc",
    },
  },
});
