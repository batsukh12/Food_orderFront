import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { imageService } from "../service";
import { restaurantService, bookmarkService } from "../service";
import ApiConfig from "../config";
import { Colors, Fonts, image } from "../const";
import { Separator, CategoryList, FoodCard } from "../component";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const { height, width } = Dimensions.get("window");
const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

const ListHeader = () => (
  <View
    style={{
      flexDirection: "row",
      flex: 1,
      width: 40,
      justifyContent: "flex-end",
    }}
  >
    <View
      style={{
        backgroundColor: Colors.LIGHT_YELLOW,
        width: 20,
        borderTopLeftRadius: 64,
        borderBottomLeftRadius: 64,
      }}
    />
  </View>
);

const ListFooter = () => (
  <View
    style={{
      flexDirection: "row",
      flex: 1,
      width: 40,
    }}
  >
    <View
      style={{
        backgroundColor: Colors.LIGHT_YELLOW,
        width: 20,
        borderTopRightRadius: 64,
        borderBottomRightRadius: 64,
      }}
    />
  </View>
);
const RestaurantScreen = ({
  navigation,
  route: {
    params: { restaurantId },
  },
}) => {
  console.log("id " + restaurantId);
  const [restaurant, setRestaurant] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const fetchFoods = useCallback(() => {
    restaurantService.getRestaurantById(restaurantId).then((response) => {
      setRestaurant(response?.data);
    });
  }, []);
  useEffect(() => {
    fetchFoods();
  }, []);
  const dispatch = useDispatch();
  const isBookmarked = useSelector(
    (state) =>
      state?.bookmarkState?.bookmarks?.filter(
        (item) => item?.restaurantId === restaurantId
      )?.length > 0
  );
  const userId = "12";
  const addBookmark = () =>
    dispatch(bookmarkService.addbookmark({ restaurantId, userId }));
  const removeBookmark = () =>
    dispatch(bookmarkService.removeBookmark({ restaurantId, userId }));
  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" translucent backgroundColor="transparent" />
      <>
        <Image
          source={{
            uri: imageService.getGalleryImage(
              restaurant?.images?.cover,
              ApiConfig.const_image.SIZE.SQUARE
            ),
          }}
          style={styles.backgroundImage}
        />
        <ScrollView>
          <Separator height={setHeight(35)} />
          <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{restaurant?.name}</Text>
              <Ionicons
                name={isBookmarked ? "bookmark" : "bookmark-outline"}
                color={Colors.DEFAULT_YELLOW}
                size={24}
                onPress={() =>
                  isBookmarked ? removeBookmark() : addBookmark()
                }
              />
            </View>
            <Text style={styles.tagText}>{restaurant?.tags?.join(" • ")}</Text>
            <View style={styles.ratingReviewsContainer}>
              <FontAwesome
                name="star"
                size={18}
                color={Colors.DEFAULT_YELLOW}
              />
              <Text style={styles.ratingText}>4.2</Text>
              <Text style={styles.reviewsText}>(455 Reviews)</Text>
            </View>
            <View style={styles.deliveryDetailsContainer}>
              <View style={styles.rowAndCenter}>
                <Image
                  style={styles.deliveryDetailIcon}
                  source={image.DELIVERY_CHARGE}
                />
                <Text style={styles.deliveryDetailText}>Free Delivery</Text>
              </View>
              <View style={styles.rowAndCenter}>
                <Image
                  style={styles.deliveryDetailIcon}
                  source={image.DELIVERY_TIME}
                />
                <Text style={styles.deliveryDetailText}>
                  {restaurant?.time} min
                </Text>
              </View>
              <View style={styles.rowAndCenter}>
                <Image
                  style={styles.deliveryDetailIcon}
                  source={image.MARKER}
                />
                <Text style={styles.deliveryDetailText}>
                  {restaurant?.distance / 1000}km
                </Text>
              </View>
              <View style={styles.restaurantType}>
                <Text style={styles.restaurantTypeText}>
                  {restaurant?.type}
                </Text>
              </View>
            </View>
            <View style={styles.categoriesContainer}>
              <FlatList
                data={restaurant?.categories}
                keyExtractor={(item) => item}
                horizontal
                ListHeaderComponent={() => <ListHeader />}
                ListFooterComponent={() => <ListFooter />}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <CategoryList
                    name={item}
                    isActive={item === selectedCategory}
                    selectCategory={(category) => setSelectedCategory(category)}
                  />
                )}
              />
            </View>
            <View style={styles.foodList}>
              {restaurant?.foods
                ?.filter((food) => food?.category === selectedCategory)
                ?.map((item) => (
                  <FoodCard
                    key={item?.id}
                    {...item}
                    navigate={() =>
                      navigation.navigate("Food", { foodId: item?.id })
                    }
                  />
                ))}
              <Separator height={setHeight(2)} />
            </View>
          </View>
        </ScrollView>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    height: setWidth(100),
    width: setWidth(100),
  },
  mainContainer: {
    backgroundColor: Colors.SECONDARY_WHITE,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 25,
    marginTop: 15,
  },
  title: {
    fontSize: 23,
    lineHeight: 23 * 1.4,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    color: Colors.DEFAULT_BLACK,
  },
  tagText: {
    marginHorizontal: 25,
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    color: Colors.DEFAULT_GREY,
  },
  ratingReviewsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 25,
    marginTop: 10,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_BOLD,
    color: Colors.DEFAULT_BLACK,
  },
  reviewsText: {
    marginLeft: 5,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Colors.DEFAULT_BLACK,
  },
  deliveryDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 25,
    marginTop: 10,
    justifyContent: "space-between",
  },
  deliveryDetailText: {
    marginLeft: 3,
    fontSize: 12,
    lineHeight: 12 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Colors.DEFAULT_BLACK,
  },
  deliveryDetailIcon: {
    height: 16,
    width: 16,
  },
  rowAndCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  restaurantType: {
    backgroundColor: Colors.LIGHT_YELLOW,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  restaurantTypeText: {
    fontSize: 13,
    fontWeight: "bold",
    lineHeight: 12 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Colors.DEFAULT_YELLOW,
  },
  categoriesContainer: {
    marginVertical: 20,
  },
  foodList: {
    marginHorizontal: 15,
  },
});

export default RestaurantScreen;
