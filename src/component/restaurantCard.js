import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Colors, Fonts } from "../const";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { imageService } from "../service";
import { bookmarkAction } from "../actions";
const RestaurantCard = ({
  id,
  name,
  images,
  tags,
  distance,
  time,
  navigate,
}) => {
  const poster = images?.poster;
  const [userId, setUserId] = useState(null);

  const dispatch = useDispatch();
  const isBookmarked = useSelector(
    (state) =>
      state?.bookmarkState?.bookmarks?.filter(
        (item) => item?.restaurantId === id
      )?.length > 0
  );
  useEffect(() => {
    const getUserAndFetch = async () => {
      try {
        const user = await StorageService.getUser();
        setUserId(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserAndFetch(); // Call the async function
  }, []);
  const restaurant = {
    name: name,
    images: images,
    location: "",
    tags: tags,
  };
  const addBookmark = () =>
    dispatch(
      bookmarkAction.addBookmark({ restaurantId: id, userId, restaurant })
    );
  const removeBookmark = () =>
    dispatch(bookmarkAction.removeBookmark({ restaurantId: id, userId }));
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => navigate(id)}
    >
      <Ionicons
        name={isBookmarked ? "bookmark" : "bookmark-outline"}
        color={Colors.DEFAULT_YELLOW}
        size={24}
        style={styles.bookmark}
        onPress={() => (isBookmarked ? removeBookmark() : addBookmark())}
      />
      <Image
        source={{ uri: imageService.getPoster(poster) }}
        style={styles.posterStyle}
      />
      <Text style={styles.titleText}>{name}</Text>
      <Text style={styles.tagText}>{tags?.join(" • ")}</Text>
      <View style={styles.footerContainer}>
        <View style={styles.rowAndCenter}>
          <FontAwesome name="star" size={14} color={Colors.DEFAULT_YELLOW} />
          <Text style={styles.ratingText}>4</Text>
          <Text style={styles.reviewsText}>({100})</Text>
        </View>
        <View style={styles.rowAndCenter}>
          <View style={styles.timeAndDistanceContainer}>
            <Ionicons
              name="location-outline"
              color={Colors.DEFAULT_YELLOW}
              size={15}
            />
            <Text style={styles.timeAndDistanceText}>{distance}</Text>
          </View>
          <View style={styles.timeAndDistanceContainer}>
            <Ionicons
              name="time-outline"
              color={Colors.DEFAULT_YELLOW}
              size={15}
            />
            <Text style={styles.timeAndDistanceText}>{time}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.DEFAULT_WHITE,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 5,
  },
  posterStyle: {
    width: 1920 * 0.15,
    height: 1080 * 0.15,
    borderRadius: 10,
    margin: 5,
  },
  titleText: {
    marginLeft: 8,
    fontSize: 15,
    lineHeight: 15 * 1.4,
    fontFamily: "Poppins-Regular",
    color: Colors.DEFAULT_BLACK,
  },
  tagText: {
    marginLeft: 8,
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 11 * 1.4,
    fontFamily: "Poppins-Regular",
    color: Colors.DEFAULT_GREY,
    marginBottom: 5,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    marginBottom: 6,
    justifyContent: "space-between",
  },
  rowAndCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeAndDistanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 3,
    backgroundColor: Colors.LIGHT_YELLOW,
    borderRadius: 12,
    marginHorizontal: 3,
  },
  timeAndDistanceText: {
    fontSize: 12,
    fontWeight: "bold",
    lineHeight: 10 * 1.4,
    fontFamily: "Poppins-Bold",
    color: Colors.DEFAULT_YELLOW,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 12,
    lineHeight: 10 * 1.4,
    fontFamily: "Poppins-Bold",
    color: Colors.DEFAULT_BLACK,
  },
  reviewsText: {
    fontSize: 12,
    lineHeight: 10 * 1.4,
    fontFamily: "Poppins-Bold",
    color: Colors.DEFAULT_BLACK,
  },
  bookmark: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },
});
export default RestaurantCard;
