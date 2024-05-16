import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  Button, // Import Button component
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { addressService, StorageService } from "../service";
import { Colors } from "../const";
const { height: screenHeight } = Dimensions.get("window");

const ShowMap = ({ visible, onClose, heightPercentage = 0.75 }) => {
  const modalHeight = screenHeight * heightPercentage;

  const initialRegion = {
    latitude: 47.918224,
    longitude: 106.917164,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [customName, setCustomName] = useState(""); // State for custom name input
  const [mapRegion, setMapRegion] = useState(initialRegion);

  const handlePlaceSelect = (data, details) => {
    if (details) {
      const { geometry } = details;
      const { location } = geometry;
      const { lat, lng } = location;
      setSelectedPlace({
        latitude: lat,
        longitude: lng,
        name: details.name,
      });
      setMapRegion({
        ...initialRegion,
        latitude: lat,
        longitude: lng,
      });
    }
  };

  const addAddress = async () => {
    try {
      const address = {
        name: customName || selectedPlace.name, // Use custom name if provided, otherwise use place name
        address: selectedPlace.name,
        longitude: selectedPlace.longitude,
        latitude: selectedPlace.latitude,
      };
      const userId = await StorageService.getUser();
      const response = await addressService.addAddress({
        address,
        userId,
      });
      onClose();
    } catch (error) {
      console.error("Error adding:", error);
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
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={mapRegion}
            showsUserLocation={true}
            showsMyLocationButton
          >
            {/* Marker for user's current location */}
            {selectedPlace && (
              <Marker
                coordinate={{
                  latitude: selectedPlace.latitude,
                  longitude: selectedPlace.longitude,
                }}
                title={selectedPlace.name}
                pinColor="blue"
              />
            )}
          </MapView>
          <GooglePlacesAutocomplete
            placeholder="Хайх..."
            onPress={handlePlaceSelect}
            query={{
              key: "AIzaSyDAPJJOL7sl5vJKWfUf0RwWDHa3ODH85UA",
              language: "en",
              components: "country:mn",
            }}
            fetchDetails={true}
            styles={styles.autocomplete}
          />
          <View style={styles.saveContainer}>
            <TextInput
              placeholder="Юу гэж хадгалах вэ?"
              value={customName}
              onChangeText={setCustomName}
              style={styles.customNameInput}
            />
            <Button
              title="Хадгалах"
              onPress={addAddress}
              style={{ color: Colors.DEFAULT_GREEN }}
            />
          </View>
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
    color: Colors.DEFAULT_GREEN,
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
  customNameInput: {
    height: 40,
    borderRadius: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 10,
  },
  saveContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
});
