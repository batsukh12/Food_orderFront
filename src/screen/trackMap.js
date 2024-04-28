import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import Geocoding from "react-native-geocoding";
import { Separator } from "../component";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Fonts } from "../const";

const { height, width } = Dimensions.get("window");
const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

Geocoding.init(
  "https://maps.googleapis.com/maps/api/place/textsearch/output?parameters"
);

const MapScreen = ({ navigation }) => {
  const initialLocation = {
    latitude: 47.9162,
    longitude: 106.9176,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };

  const [location, setLocation] = useState(initialLocation);

  const [searchInput, setSearchInput] = useState("");
  const watchId = useRef(null);
  const homeLocation = {
    latitude: 47.9162,
    longitude: 106.9176,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          trackLocation();
        } else {
          console.log("Permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestLocationPermission();

    // Cleanup function
    return () => {
      if (watchId.current !== null) {
        Geolocation.clearWatch(watchId.current);
      }
    };
  }, []);
  console.log(Geocoding.fromAddress);

  const trackLocation = () => {
    // Assign the returned watch ID to watchId.current
    watchId.current = Geolocation.watchPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, distanceFilter: 0 }
    );
  };

  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      Geocoding.fromAddress(searchInput.trim())
        .then((result) => {
          const { lat, lng } = result.results[0].geometry.location;
          setLocation({
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          });
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Газрын зураг </Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Хайх..."
          value={searchInput}
          onChangeText={(text) => setSearchInput(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Хайх </Text>
        </TouchableOpacity>
      </View>
      {location && (
        <MapView
          style={styles.map}
          region={location}
          provider={PROVIDER_GOOGLE}
        >
          <Marker coordinate={location} />
          <Marker coordinate={homeLocation} title="Home" />
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
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
    width: setWidth(80),
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.DEFAULT_GREY,
    borderRadius: 5,
    marginRight: 10,
    fontFamily: "Comfortaa-Regular",
  },
  searchButton: {
    backgroundColor: Colors.DEFAULT_GREEN,
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 5,
  },
  searchButtonText: {
    color: Colors.DEFAULT_WHITE,
    fontFamily: "Comfortaa-Bold",
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
