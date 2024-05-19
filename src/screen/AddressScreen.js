import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Fonts } from "../const";
import { Separator } from "../component";
import { addressService, StorageService } from "../service";
import AntDesign from "react-native-vector-icons/AntDesign";

const { height, width } = Dimensions.get("window");
const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

const AddressScreen = ({ navigation }) => {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const userId = await StorageService.getUser();
        const response = await addressService.getAddress(userId);
        if (response.status === true && response.data) {
          setAddresses(response.data);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    fetchAddresses();
  }, []);

  const handleUpdateAddress = (addressId) => {
    // Placeholder for update address logic
    console.log("Update address:", addressId);
  };

  const handleDeleteAddress = async (addressId) => {
    const response = await addressService.deleteAddress({ addressId });
    if (response.status === true && response.data) {
      setAddresses(response.data);
    }
  };

  const renderAddressItem = ({ item }) => (
    <View style={styles.addressContainer}>
      <View style={styles.addressTextContainer}>
        <Text style={styles.addressText}>{item.name}</Text>
        <Text style={styles.cityText}>{item.address}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => handleUpdateAddress(item._id)}
        >
          <Ionicons
            name="pencil-outline"
            size={20}
            color={Colors.DEFAULT_WHITE}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteAddress(item._id)}
        >
          <AntDesign name="delete" size={20} color={Colors.DEFAULT_BLACK} />
        </TouchableOpacity>
      </View>
    </View>
  );

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
        <Text style={styles.headerTitle}>Хадгалсан хаягууд</Text>
      </View>
      <FlatList
        data={addresses}
        keyExtractor={(item) => item._id}
        renderItem={renderAddressItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default AddressScreen;

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
  listContainer: {
    paddingHorizontal: 20,
  },
  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    elevation: 1,
  },
  addressTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  addressText: {
    fontSize: 16,
    fontFamily: "Comfortaa-Bold",
    color: Colors.DEFAULT_BLACK,
  },
  cityText: {
    fontSize: 14,
    fontFamily: "Comfortaa-Regular",
    color: Colors.DEFAULT_GREY,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  updateButton: {
    backgroundColor: Colors.DEFAULT_BLUE,
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    padding: 10,
    borderRadius: 5,
  },
});
