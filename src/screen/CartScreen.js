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
} from "react-native";
import { Colors, Fonts, Images } from "../const";
import { FoodCard, Separator } from "../component";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useSelector, useDispatch } from "react-redux";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageService } from "../service";

const { height, width } = Dimensions.get("window");
const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

const CartScreen = ({ navigation }) => {
  const [carts, setCarts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchCart = useCallback(async () => {
    try {
      const cart = await AsyncStorage.getItem("carts");
      const userId = await StorageService.getUser();

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
  }, [fetchCart]);
  useEffect(() => {
    // Calculate total amount based on the current state of the cart
    const calculateTotalAmount = () => {
      const total = carts.reduce(
        (acc, curr) => acc + curr.price * curr.count,
        0
      );
      setTotalAmount(total.toFixed(2));
    };

    // Call the function to calculate the total amount
    calculateTotalAmount();
  }, [carts]);

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
        <Text style={styles.headerTitle}>Сагс </Text>
      </View>
      {carts.length > 0 ? (
        <ScrollView>
          <View style={styles.foodList}>
            {carts.map((item) => (
              <FoodCard
                {...item}
                key={item.id}
                navigate={() =>
                  navigation.navigate("Food", { foodId: item.id })
                }
                onRemoveItem={() =>
                  removeFromCart({ foodId: item.id, userId: item.userId })
                }
              />
            ))}
          </View>
          <View style={styles.promoCodeContainer}>
            <View style={styles.rowAndCenter}>
              <Entypo name="ticket" size={30} color={Colors.DEFAULT_YELLOW} />
              <Text style={styles.promoCodeText}>Add Promo Code</Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color={Colors.DEFAULT_BLACK}
            />
          </View>
          <View style={styles.amountContainer}>
            <View style={styles.amountSubContainer}>
              <Text style={styles.amountLabelText}>Барааны үнэ </Text>
              <Text style={styles.amountText}>₮ {totalAmount}</Text>
            </View>
            <View style={styles.amountSubContainer}>
              <Text style={styles.amountLabelText}>Хөнгөлөлт </Text>
              <Text style={styles.amountText}>
                ₮ 0.00 {/* Assuming no discount */}
              </Text>
            </View>
            <View style={styles.amountSubContainer}>
              <Text style={styles.amountLabelText}>Хүргэлт </Text>
              <Text
                style={{ ...styles.amountText, color: Colors.DEFAULT_GREEN }}
              >
                Free
              </Text>
            </View>
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Нийт үнэ </Text>
            <Text style={styles.totalText}>₮ {totalAmount}</Text>
          </View>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => navigation.navigate("Checkout")}
          >
            <View style={styles.rowAndCenter}>
              <Ionicons
                name="cart-outline"
                color={Colors.DEFAULT_WHITE}
                size={20}
              />
              <Text style={styles.checkoutText}>Захиалах </Text>
            </View>
            <Text style={styles.checkoutText}>₮ {totalAmount}</Text>
          </TouchableOpacity>
          <Separator height={setHeight(9)} />
        </ScrollView>
      ) : (
        <View style={styles.emptyCartContainer}>
          <LottieView
            source={require("../assets/animation/empty.json")}
            style={styles.emptyCartImage}
            autoPlay
            loop
          />
          <Text style={styles.emptyCartText}>Сагс хоосон байна </Text>
          <Text style={styles.emptyCartSubText}>
            Явж, амттай хоол захиалаарай
          </Text>
          <TouchableOpacity style={styles.addButtonEmpty}>
            <AntDesign name="plus" color={Colors.DEFAULT_WHITE} size={20} />
            <Text style={styles.addButtonEmptyText}>Захиалах</Text>
          </TouchableOpacity>
          <Separator height={setHeight(15)} />
        </View>
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
  promoCodeText: {
    fontSize: 15,
    fontFamily: "Poppins-Medium",
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_BLACK,
    marginLeft: 10,
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
    fontFamily: "Comfortaa-Bold",
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_GREEN,
  },
  amountText: {
    fontSize: 15,
    fontFamily: "Comfortaa-Bold",
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
    justifyContent: "space-between",
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
    fontFamily: "Comfortaa-Bold",
    lineHeight: 30 * 1.4,
    color: Colors.DEFAULT_GREEN,
  },
  emptyCartSubText: {
    fontSize: 12,
    fontFamily: "Comfortaa-Regular",
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
    fontFamily: "Comfortaa-Bold",
    lineHeight: 12 * 1.4,
    color: Colors.DEFAULT_WHITE,
    marginLeft: 10,
  },
  emptyCartImage: {
    height: setWidth(60),
    width: setWidth(60),
  },
});

export default CartScreen;
