import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Colors, Fonts } from "../const";
import ApiConfig from "../config";
import { imageService } from "../service";
import { useSelector, useDispatch } from "react-redux";
import { cartAction } from "../actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageService } from "../service";

const { height, width } = Dimensions.get("window");
const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

const FoodCard = ({ id, name, description, price, image, navigate }) => {
  const [userId, setUserId] = useState(null);

  const dispatch = useDispatch();

  const item = {
    id: id,
    name: name,
    description: description,
    price: price,
    image: image,
  };
  useEffect(() => {
    const getUserAndFetch = async () => {
      try {
        const user = await StorageService.getUser();
        setUserId(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserAndFetch();
  }, []);

  const itemCount = useSelector(
    (state) =>
      state?.cartState?.cart?.find((item) => item.id === id)?.count || 0
  );

  const addToCart = () => {
    dispatch(cartAction.addToCart({ userId, item }));
  };
  const removeFromCart = () => {
    dispatch(cartAction.removeFromCart({ foodId: id, userId }));
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate()} activeOpacity={0.8}>
        <Image
          style={styles.image}
          source={{
            uri: imageService.getGalleryImage(
              image,
              ApiConfig.const_image.SIZE.SQUARE
            ),
          }}
        />
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        <TouchableOpacity onPress={() => navigate()} activeOpacity={0.8}>
          <Text numberOfLines={1} style={styles.titleText}>
            {name}
          </Text>
          <Text numberOfLines={2} style={styles.descriptionText}>
            {description}
          </Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.priceText}>$ {price}</Text>
          <View style={styles.itemAddContainer}>
            {itemCount > 0 ? (
              <>
                <AntDesign
                  name="minus"
                  color={Colors.DEFAULT_YELLOW}
                  size={18}
                  onPress={() => removeFromCart()}
                />
                <Text style={styles.itemCountText}>{itemCount}</Text>
              </>
            ) : null}

            <AntDesign
              name="plus"
              color={Colors.DEFAULT_YELLOW}
              size={18}
              onPress={() => addToCart()}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    fontFamily: Fonts.POPPINS_BOLD,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    marginBottom: 8,
  },
  descriptionText: {
    width: setWidth(60),
    color: Colors.DEFAULT_GREY,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    fontSize: 11,
    fontWeight: "bold",
    lineHeight: 10 * 1.4,
    marginBottom: 8,
  },
  priceText: {
    color: Colors.DEFAULT_YELLOW,
    fontFamily: Fonts.POPPINS_BOLD,
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
  itemAddContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.LIGHT_GREY2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  itemCountText: {
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    marginHorizontal: 8,
  },
});

export default FoodCard;
