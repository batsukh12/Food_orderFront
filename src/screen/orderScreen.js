import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { Colors } from "../const";
import { cartService, imageService } from "../service";
import { StorageService } from "../service";
import Ionicons from "react-native-vector-icons/Ionicons";
import ApiConfig from "../config";
import { Separator } from "../component";
import AntDesign from "react-native-vector-icons/AntDesign";
import { cartAction } from "../actions";
import { useDispatch } from "react-redux";

const { height, width } = Dimensions.get("window");
const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

const OrderScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await StorageService.getUser();
        setUserId(userId);

        const response = await cartService.getCartItems(userId);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  const dispatch = useDispatch();

  const addToCart = (item) => {
    const items = {
      id: item.food.foodId,
      name: item.food.name,
      description: item.food.name,
      price: item.food.price,
      image: item.food.image,
    };
    dispatch(cartAction.addToCart({ userId, item: items }));
    navigation.navigate("Cart");
  };
  const renderCartItem = ({ item, index }) => {
    const currentItemDate = new Date(item.date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const previousItemDate =
      index > 0
        ? new Date(orders[index - 1].date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : null;

    const shouldShowDateHeader = currentItemDate !== previousItemDate;

    return (
      <>
        {shouldShowDateHeader && (
          <View style={styles.dateHeaderContainer}>
            <Text style={styles.dateHeaderText}>{currentItemDate}</Text>
          </View>
        )}
        <View style={styles.cartItemContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Food", { foodId: item.food.foodId })
            }
            activeOpacity={0.8}
          >
            <Image
              style={styles.image}
              source={{
                uri: imageService.getGalleryImage(
                  item.food.image,
                  ApiConfig.const_image.SIZE.SQUARE
                ),
              }}
            />
          </TouchableOpacity>
          <View style={styles.detailsContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Food", { foodId: item.food.foodId })
              }
              activeOpacity={0.8}
            >
              <Text numberOfLines={1} style={styles.titleText}>
                {item.food.name}
              </Text>
              <Text numberOfLines={2} style={styles.descriptionText}>
                Quantity: {item.food.count}
              </Text>
            </TouchableOpacity>
            <View style={styles.footerContainer}>
              <Text style={styles.priceText}>₮ {item.food.price}</Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => addToCart(item)}
          >
            <View style={styles.rowAndCenter}>
              <AntDesign
                name="reload1"
                color={Colors.DEFAULT_WHITE}
                size={18}
              />

              <Text style={styles.checkoutText}>Дахин захиалах </Text>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
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
        <Text style={styles.headerTitle}>Миний захиалга </Text>
      </View>

      <FlatList
        style={styles.foodList}
        data={orders}
        renderItem={renderCartItem}
        keyExtractor={(item) => item._id}
      />
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
    marginBottom: 20,
  },
  dateHeaderContainer: {
    marginVertical: 10,
    marginHorizontal: setWidth(4),
  },
  dateHeaderText: {
    fontSize: 16,
    color: Colors.DEFAULT_BLACK,
    fontWeight: "bold",
  },
  cartItemContainer: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 10,
    elevation: 2,
    backgroundColor: Colors.LIGHT_GREY,
  },
  image: {
    height: 100,
    width: 100,
    margin: 6,
    borderRadius: 8,
  },
  detailsContainer: {
    marginHorizontal: 5,
  },
  titleText: {
    width: setWidth(60),
    color: Colors.DEFAULT_BLACK,
    fontFamily: "Poppins-Bold",
    fontSize: 13,
    lineHeight: 13 * 1.4,
    marginBottom: 8,
  },
  descriptionText: {
    width: setWidth(60),
    color: Colors.DEFAULT_GREY,
    fontFamily: "Poppins-SemiBold",
    fontSize: 11,
    fontWeight: "bold",
    lineHeight: 10 * 1.4,
    marginBottom: 8,
  },
  priceText: {
    color: Colors.DEFAULT_YELLOW,
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 14 * 1.4,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
  rowAndCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkoutButton: {
    flexDirection: "row",
    backgroundColor: Colors.DEFAULT_GREEN,
    alignSelf: "center",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: setHeight(5),
    marginTop: 10,
  },
  checkoutText: {
    fontSize: 14,
    fontFamily: "Comfortaa-Bold",
    lineHeight: 14 * 1.4,
    color: Colors.DEFAULT_WHITE,
    marginLeft: 8,
  },
});

export default OrderScreen;
