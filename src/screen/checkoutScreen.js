import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  Modal,
} from "react-native";
import { Colors, Fonts, image } from "../const";
import { FoodCard, Separator, Payment } from "../component";
import Ionicons from "react-native-vector-icons/Ionicons";
import { cartService, imageService, StorageService } from "../service";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const addressList = [
  { id: "1", title: "Home", description: "Khan uul 21-r duureg" },
  { id: "2", title: "Work", description: "Ikh delguur phantom" },
  { id: "3", title: "School", description: "Bagshiin deed" },
];
const { height, width } = Dimensions.get("window");
const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

const CheckoutScreen = ({ navigation }) => {
  const [carts, setCarts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(addressList[0]); // Initial value set to the first address
  const [user, setUser] = useState("");

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address); // Update the selected address
    setIsModalVisible(false); // Close the modal after selection
  };
  const fetchCart = useCallback(async () => {
    try {
      const cart = await AsyncStorage.getItem("carts");
      const userId = await StorageService.getUser();
      setUser(userId);
      if (cart) {
        const parsedCartItems = JSON.parse(cart);
        const getCart = parsedCartItems.filter(
          (cart) => cart.userId === userId
        );

        setCarts(getCart);
      }
    } catch (error) {
      console.error("Error while fetching cart:", error);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchCart();
    });

    return unsubscribe;
  }, []);
  useEffect(() => {
    const calculateTotalAmount = () => {
      const total = carts.reduce(
        (acc, curr) => acc + curr.price * curr.count,
        0
      );
      setTotalAmount(total.toFixed(2));
    };

    calculateTotalAmount();
  }, [carts]);

  const addToCart = () => {
    if (!Array.isArray(carts) || carts.length === 0) {
      console.error("carts is not a valid array or is empty");
      return;
    }
    const itemsArray = carts.map((cartItem) => ({
      foodId: cartItem.id,
      image: cartItem.image,
      name: cartItem.name,
      count: cartItem.count,
      price: cartItem.price,
      totalPrice: cartItem.price * cartItem.count,
    }));
    const userId = user;

    cartService.addToCart({ items: itemsArray, userId: userId });
    navigation.navigate("Deliver");
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
        <Text style={styles.headerTitle}>Захиалга </Text>
      </View>
      <View style={styles.mapDetail}>
        <TouchableOpacity activeOpacity={0.8}>
          <Image style={styles.image} source={image.Map} />
        </TouchableOpacity>
        <View style={{ marginLeft: 10, flex: 1 }}>
          <View style={styles.titleContainer}>
            <Text numberOfLines={1} style={styles.titleText}>
              Хүргэлтийн хаяг: {selectedAddress.title}
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={toggleModal}
              style={styles.changeButton}
            >
              <Text style={styles.changeText}>Сонгох </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={18} color={Colors.DEFAULT_BLACK} />
            <Text numberOfLines={2} style={styles.descriptionText}>
              {selectedAddress.description}
            </Text>
          </View>
        </View>
      </View>
      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={addressList}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.addressItem}
                  onPress={() => handleAddressSelect(item)}
                >
                  <Text style={styles.addressTitle}>{item.title}</Text>
                  <Text style={styles.addressDescription}>
                    {item.description}
                  </Text>
                </TouchableOpacity>
              )}
              style={styles.addressList}
            />
          </View>
        </View>
      </Modal>
      <ScrollView>
        <View style={styles.foodList}>
          {carts.map((item) => (
            <FoodCard {...item} key={item.id} />
          ))}
        </View>
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderTitle}>Төлбөр төлөх </Text>
          <Text style={styles.listHeaderSubtitle}>Нэмэх </Text>
        </View>
        <View style={styles.foodList}>
          <Payment />
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Нийт үнэ </Text>
          <Text style={styles.totalText}>₮ {totalAmount}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => addToCart()}
        >
          <Text style={styles.checkoutText}>Төлбөр төлөх </Text>
        </TouchableOpacity>
        <Separator height={setHeight(9)} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapDetail: {
    marginHorizontal: setWidth(4),

    marginTop: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  image: {
    height: 50,
    width: 50,
    margin: 6,
    borderRadius: 8,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Align items to opposite ends of the container
    alignItems: "center",
    width: "100%", // Make sure the container spans the entire width
  },
  titleText: {
    fontWeight: "bold",
    fontFamily: "Comfortaa-Bold",
    fontSize: 16,
    color: Colors.DEFAULT_BLACK,
  },
  changeButton: {
    padding: 5,
  },
  changeText: {
    fontWeight: "bold",
    fontFamily: "Comfortaa-Bold",
    color: Colors.DEFAULT_YELLOW,
    fontSize: 16,
    lineHeight: 16 * 1.4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  descriptionText: {
    marginLeft: 5,
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: 14,
    color: Colors.DEFAULT_BLACK,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5, // Shadow effect
  },
  addressList: {
    marginTop: 10,
  },
  addressItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.DEFAULT_GREY,
  },
  addressTitle: {
    fontFamily: Fonts.POPPINS_BOLD,
    fontSize: 14,
    color: Colors.DEFAULT_BLACK,
  },
  addressDescription: {
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: 12,
    color: Colors.DEFAULT_GREY,
  },
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
  foodList: {
    marginHorizontal: setWidth(4),
  },
  promoCodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: setWidth(4),
    paddingVertical: 15,
    marginTop: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    justifyContent: "space-between",
  },
  listHeader: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 5,
  },
  listHeaderTitle: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 16,
    lineHeight: 16 * 1.4,
    fontFamily: "Comfortaa-Bold",
  },
  listHeaderSubtitle: {
    color: Colors.DEFAULT_YELLOW,
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontFamily: "Comfortaa-Bold",
  },
  rowAndCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  amountContainer: {
    marginHorizontal: setWidth(4),
    paddingVertical: 20,
    borderBottomWidth: 0.5,
  },
  amountSubContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 3,
  },
  amountLabelText: {
    fontSize: 15,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_GREEN,
  },
  amountText: {
    fontSize: 15,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_BLACK,
  },
  totalContainer: {
    marginHorizontal: setWidth(4),
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalText: {
    fontSize: 20,
    fontFamily: "Comfortaa-Bold",
    lineHeight: 20 * 1.4,
    color: Colors.DEFAULT_BLACK,
  },
  checkoutButton: {
    flexDirection: "row",
    width: setWidth(80),
    backgroundColor: Colors.DEFAULT_GREEN,
    alignSelf: "center",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: setHeight(7),
    marginTop: 10,
  },
  checkoutText: {
    fontSize: 16,
    fontFamily: "Comfortaa-Bold",
    lineHeight: 16 * 1.4,
    color: Colors.DEFAULT_WHITE,
    marginLeft: 8,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: 30,
    fontFamily: Fonts.POPPINS_LIGHT,
    lineHeight: 30 * 1.4,
    color: Colors.DEFAULT_GREEN,
  },
  emptyCartSubText: {
    fontSize: 12,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 12 * 1.4,
    color: Colors.INACTIVE_GREY,
  },
  addButtonEmpty: {
    flexDirection: "row",
    backgroundColor: Colors.DEFAULT_YELLOW,
    borderRadius: 8,
    paddingHorizontal: setWidth(4),
    paddingVertical: 5,
    marginTop: 10,
    justifyContent: "space-evenly",
    elevation: 3,
    alignItems: "center",
  },
  addButtonEmptyText: {
    fontSize: 12,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 12 * 1.4,
    color: Colors.DEFAULT_WHITE,
    marginLeft: 10,
  },
  emptyCartImage: {
    height: setWidth(60),
    width: setWidth(60),
  },
});

export default CheckoutScreen;
