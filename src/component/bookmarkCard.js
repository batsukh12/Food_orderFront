import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Colors, Fonts, image } from "../const";
import { imageService } from "../service";
import { useDispatch, useSelector } from "react-redux";
import { bookmarkAction } from "../actions";
import { StorageService } from "../service";

const BookmarkCard = ({
  restaurantId,
  name,
  images,
  location,
  tags,
  navigate,
}) => {
  const [userId, setUserId] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    const getUserAndFetch = async () => {
      try {
        const userId = await StorageService.getUser();

        setUserId(userId);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserAndFetch(); // Call the async function
  }, []);
  const removeBookmark = () =>
    dispatch(bookmarkAction.removeBookmark({ restaurantId, userId }));

  return (
    <View style={styles.container}>
      <Ionicons
        name="close-circle"
        color={Colors.DEFAULT_GREY}
        size={22}
        style={styles.remomveIcon}
        onPress={() => removeBookmark()}
      />
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigate(id)}>
        <Image
          source={{ uri: imageService.getPoster(images?.poster) }}
          style={styles.posterStyle}
        />
      </TouchableOpacity>
      <View style={styles.labelContainer}>
        <Text style={styles.titleText}>{name}</Text>
        <View style={styles.rowAndCenter}>
          <Entypo name="location" size={10} color={Colors.DEFAULT_GREY} />
          <Text style={styles.locationText}>{location}</Text>
        </View>
        <Text style={styles.tagText}>{tags?.slice(0, 3).join(" • ")}</Text>
        <View style={styles.buttonLabelRow}>
          <View style={styles.rowAndCenter}>
            <FontAwesome name="star" size={13} />
            <Text style={styles.ratingText}>4.3</Text>
          </View>
          <View style={styles.rowAndCenter}>
            <Image
              source={image.DELIVERY_TIME}
              style={styles.deliveryDetailsIcon}
            />
            <Text style={styles.ratingText}>20 mins</Text>
          </View>
          <View style={styles.rowAndCenter}>
            <Ionicons
              name="location-outline"
              color={Colors.SECONDARY_GREEN}
              size={15}
            />
            <Text style={styles.ratingText}>10 KM</Text>
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
    alignItems: "center",
  },
  posterStyle: {
    width: 80,
    height: 80,
    borderRadius: 10,
    margin: 5,
  },
  remomveIcon: {
    position: "absolute",
    zIndex: 5,
    top: 0,
    right: 0,
  },
  labelContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Colors.DEFAULT_BLACK,
    marginBottom: 5,
  },
  tagText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Colors.DEFAULT_GREY,
    marginBottom: 5,
  },
  rowAndCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 13,
    fontWeight: "bold",
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Colors.DEFAULT_GREY,
    marginBottom: 5,
    marginLeft: 5,
  },
  ratingText: {
    fontSize: 12,
    lineHeight: 12 * 1.4,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    color: Colors.DEFAULT_BLACK,
    marginLeft: 3,
  },
  buttonLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deliveryDetailsIcon: {
    height: 16,
    width: 16,
  },
});

export default BookmarkCard;
