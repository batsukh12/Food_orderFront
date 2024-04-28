import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  PermissionsAndroid,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import { Colors, Fonts, image } from "../const";
import { Separator } from "../component";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

const DeliveryScreen = ({ navigation }) => {
  const homeLocation = {
    latitude: 47.915277,
    longitude: 106.906291,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };

  const restaurantLocation = {
    latitude: 47.920519,
    longitude: 106.919328,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };

  const [location, setLocation] = useState(homeLocation);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  // Function to fetch route data from Google Directions API
  const fetchRoute = async () => {
    const origin = `${homeLocation.latitude},${homeLocation.longitude}`;
    const destination = `${restaurantLocation.latitude},${restaurantLocation.longitude}`;
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GOOGLE_MAPS_API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        // Extract route points
        const points = data.routes[0].overview_polyline.points;
        const decodedPolyline = MapView.Polyline.decodePath(points);

        // Set route coordinates
        setRouteCoordinates(decodedPolyline);
      }
    } catch (error) {
      console.error("Error fetching route data: ", error);
    }
  };

  // Request location permission and update location tracking
  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message:
              "This app needs access to your location to show the map view.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start watching user's location
          Geolocation.watchPosition(
            (position) => {
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              });
            },
            (error) => {
              console.error("Geolocation error: ", error);
            },
            { enableHighAccuracy: true, distanceFilter: 0 }
          );
        } else {
          console.log("Location permission denied");
        }
      } catch (err) {
        console.error("Failed to request location permission: ", err);
      }
    };

    requestLocationPermission();
    fetchRoute(); // Fetch the route when the component mounts

    return () => {
      // Cleanup location tracking
      Geolocation.clearWatch();
    };
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={location}>
        <Marker coordinate={location} title="Current Location" />
        <Marker
          coordinate={homeLocation}
          title="Home Location"
          pinColor="blue"
        />
        <Marker
          coordinate={restaurantLocation}
          title="Nearest KFC"
          pinColor="red"
        />

        {/* Add a Polyline to show the route between home and restaurant locations */}
        <Polyline
          coordinates={routeCoordinates}
          strokeColor={Colors.DEFAULT_BLACK} // Color of the line
          strokeWidth={4} // Width of the line
        />
      </MapView>

      <View style={styles.section}>
        <Text style={styles.header}>Хүргэлт</Text>

        <View style={styles.descriptionContainer}>
          <View>
            <Text style={styles.timeline}>20 - 30 минут </Text>
            <Text style={styles.deliverDetails}>Таны захиалгыг таны гарт </Text>
          </View>
          <Image source={image.deliver} style={styles.image} />
        </View>

        <View style={styles.avatarContainer}>
          <Image source={image.User} style={styles.userImg} />
          <View style={styles.userInfo}>
            <Text style={styles.name}>Сугар </Text>
            <Text style={styles.desc}>Бидний шилдэг жолооч </Text>
          </View>

          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <View style={styles.callButton}>
                <Ionicons
                  name="call-outline"
                  color={Colors.DEFAULT_GREEN}
                  size={30}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
              <View style={styles.cancelButton}>
                <MaterialIcons
                  name="cancel"
                  color={Colors.DEFAULT_RED}
                  size={30}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DeliveryScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  map: {
    flex: 1,
  },
  section: {
    padding: 15, // Adjusted padding for section
    marginHorizontal: 5, // Small horizontal margin
    borderRadius: 10,
    backgroundColor: Colors.DEFAULT_WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    color: Colors.DEFAULT_BLACK,
    fontFamily: "Comfortaa-Bold",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  timeline: {
    color: Colors.DEFAULT_BLACK,
    fontFamily: "Comfortaa-Bold",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 5,
  },
  deliverDetails: {
    color: Colors.DEFAULT_GRAY,
    fontFamily: "Comfortaa-Regular",
    fontSize: 16,
    marginBottom: 5,
  },
  image: {
    height: 60,
    width: 60,
    marginLeft: 15,
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.LIGHT_YELLOW,
    padding: 15, // Adjusted padding for avatarContainer
    borderRadius: 10,
    marginVertical: 10,
    elevation: 2,
  },
  userImg: {
    borderRadius: 30, // Adjusted to make the avatar a circle
    height: 60,
    width: 60,
  },
  userInfo: {
    marginLeft: 10,
  },
  name: {
    color: Colors.DEFAULT_BLACK,
    fontFamily: "Comfortaa-Bold",
    fontSize: 16,
  },
  desc: {
    color: Colors.DEFAULT_GRAY,
    fontFamily: "Comfortaa-Regular",
    fontSize: 14,
  },
  iconContainer: {
    flexDirection: "row",
    marginLeft: 20, // Move to the right side
    gap: 10,
  },
  callButton: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  cancelButton: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
});
