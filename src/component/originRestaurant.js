import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Colors, Fonts, image } from "../const";
import { imageService } from "../service";

const { height, width } = Dimensions.get("window");

const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;
const FavRestaurant = ({ name, images: { logo }, time, distance, tags }) => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{ uri: imageService.getLogo(logo) }}
          style={styles.posterStyle}
        />
      </View>
      <View style={styles.labelContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{name}</Text>
          <View style={styles.rowAndCenter}>
            <FontAwesome />
            <Text style={styles.ratingText}>4.2</Text>
            <Text style={styles.reviewsText}>({233})</Text>
          </View>
        </View>
        <Text style={styles.tagsText}>{tags?.join(" • ")}</Text>
        <View style={styles.deliveryDetailsContainer}>
          <View style={styles.rowAndCenter}>
            <Image
              source={image.DELIVERY_CHARGE}
              style={styles.deliveryDetailsIcon}
            />
            <Text style={styles.deliveryDetailsText}>Free Delivery</Text>
          </View>
          <View style={styles.rowAndCenter}>
            <Image
              source={image.DELIVERY_TIME}
              style={styles.deliveryDetailsIcon}
            />
            <Text style={styles.deliveryDetailsText}>{time} min</Text>
          </View>
          <View style={styles.rowAndCenter}>
            <Image style={styles.deliveryDetailsIcon} />
            <Text style={styles.deliveryDetailsText}>{distance}m</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    elevation: 1,
    borderRadius: 8,
    backgroundColor: Colors.DEFAULT_WHITE,
    marginTop: 8,
  },
  posterStyle: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 5,
  },
  labelContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deliveryDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontFamily: Fonts.POPPINS_BOLD,
    color: Colors.DEFAULT_BLACK,
    marginBottom: 5,
  },
  tagsText: {
    fontSize: 11,
    fontWeight: "bold",
    lineHeight: 11 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Colors.DEFAULT_GREY,
    marginBottom: 7,
  },
  deliveryDetailsText: {
    marginLeft: 3,
    fontSize: 12,
    lineHeight: 12 * 1.4,
    fontFamily: "Poppins-Bold",
    color: Colors.DEFAULT_BLACK,
  },
  deliveryDetailsIcon: {
    height: 16,
    width: 16,
  },
  rowAndCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: "Poppins-Bold",
    color: Colors.DEFAULT_BLACK,
  },
  reviewsText: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: "Poppins-Regular",
    color: Colors.DEFAULT_BLACK,
  },
});

export default FavRestaurant;
