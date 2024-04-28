import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Colors, Fonts, image, customFonts } from "../const";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {
  Separator,
  Categories,
  RestaurantCard,
  FavRestaurant,
} from "../component";
import LottieView from "lottie-react-native";
import { restaurantService } from "../service";
import ShowMap from "../component/bottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const sortStyle = (isActive) =>
  isActive
    ? styles.sortListItem
    : { ...styles.sortListItem, borderBottomColor: Colors.DEFAULT_WHITE };
const { height, width } = Dimensions.get("window");

const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;
const HomeScreen = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState(null);
  const [activeSortItem, setActiveSortItem] = useState("recent");
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const fetchRestaurants = useCallback(() => {
    setIsLoading(true);
    restaurantService.getRestaurants().then((response) => {
      setIsLoading(false);
      if (response?.status) {
        setRestaurants(response?.data);
      }
    });
  }, []);

  useEffect(() => {
    fetchRestaurants();
  }, []);
  const filteredRestaurants = activeCategory
    ? restaurants.filter((restaurant) =>
        restaurant.categories.includes(activeCategory)
      )
    : restaurants;
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const openBottomSheet = () => {
    setIsBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    setIsBottomSheetVisible(false);
  };
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={Colors.DEFAULT_GREEN}
      />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <LottieView
            style={styles.animation}
            source={require("../assets/animation/main_load.json")}
            autoPlay
          />
        </View>
      ) : (
        <>
          <Separator height={StatusBar.currentHeight} />
          <View style={styles.background} />
          <View style={styles.header}>
            <View style={styles.locationContainer}>
              <Image style={styles.image} source={image.deliver} />
              <TouchableOpacity
                style={{ marginLeft: 20 }}
                onPress={openBottomSheet}
              >
                <Text style={styles.locationText}>Хүргэлтийн хаяг </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.selectedText}>Home</Text>
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={18}
                    color={Colors.DEFAULT_GREEN}
                  />
                </View>
              </TouchableOpacity>
              <Feather
                name="bell"
                size={26}
                color={Colors.DEFAULT_BLACK}
                style={{ position: "absolute", right: 0 }}
              />
              <View style={styles.alertBadge}>
                <Text style={styles.alertBadgeText}>12</Text>
              </View>
            </View>
            <ShowMap
              visible={isBottomSheetVisible}
              onClose={closeBottomSheet}
            />
            <View style={styles.searchContainer}>
              <View style={styles.searchSections}>
                <Feather name="search" size={25} color={Colors.DEFAULT_GREY} />
              </View>
              <TextInput placeholder="Хайх.." />
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.categoriesContainer}
            ></ScrollView>
            <Categories
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
            <ScrollView style={styles.listContainer}>
              <View style={styles.horizontalListContainer}>
                <View style={styles.listHeader}>
                  <Text style={styles.listHeaderTitle}>Онцгой </Text>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setActiveCategory(null)}
                  >
                    <Text style={styles.listHeaderSubtitle}>Бүгдийг харах</Text>
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={filteredRestaurants}
                  keyExtractor={(item) => item?.id}
                  horizontal
                  ListHeaderComponent={() => <Separator width={20} />}
                  ListFooterComponent={() => <Separator width={20} />}
                  ItemSeparatorComponent={() => <Separator width={10} />}
                  renderItem={({ item }) => (
                    <RestaurantCard
                      id={item.id}
                      name={item.name}
                      images={item.images}
                      tags={item.tags}
                      distance={item.distance}
                      time={item.time}
                      navigate={() =>
                        navigation.navigate("Restaurant", {
                          restaurantId: item.id,
                        })
                      }
                    />
                  )}
                />
              </View>
              <View style={styles.sortListContainer}>
                <TouchableOpacity
                  style={sortStyle(activeSortItem === "recent")}
                  activeOpacity={0.8}
                  onPress={() => setActiveSortItem("recent")}
                >
                  <Text style={styles.sortListItemText}>Recent</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={sortStyle(activeSortItem === "favorite")}
                  activeOpacity={0.8}
                  onPress={() => setActiveSortItem("favorite")}
                >
                  <Text style={styles.sortListItemText}>Favorite</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={sortStyle(activeSortItem === "rating")}
                  activeOpacity={0.8}
                  onPress={() => setActiveSortItem("rating")}
                >
                  <Text style={styles.sortListItemText}>Rating</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={sortStyle(activeSortItem === "popular")}
                  activeOpacity={0.8}
                  onPress={() => setActiveSortItem("popular")}
                >
                  <Text style={styles.sortListItemText}>Popular</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={sortStyle(activeSortItem === "trending")}
                  activeOpacity={0.8}
                  onPress={() => setActiveSortItem("trending")}
                >
                  <Text style={styles.sortListItemText}>Trending</Text>
                </TouchableOpacity>
              </View>
              {restaurants?.map((item) => (
                <FavRestaurant {...item} key={item?.id} />
              ))}
              <Separator height={setHeight(5)} />
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  background: {
    marginTop: 40,
    backgroundColor: Colors.DEFAULT_WHITE,
    height: 2000,
    top: -1 * (2000 - 250),
    width: 2000,
    borderRadius: 2000,
    alignSelf: "center",
    position: "absolute",
    zIndex: -1,
  },
  image: {
    width: 40,
    height: 40,
  },
  container: {
    marginTop: 12,
    flex: 1,
    marginBottom: 70,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: 100,
    height: 100,
  },
  header: {
    justifyContent: "space-evenly",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    marginHorizontal: 20,
  },
  locationText: {
    color: Colors.DEFAULT_BLACK,
    marginLeft: 5,
    fontSize: 15,
    lineHeight: 15 * 1.4,
    fontFamily: "Comfortaa-Bold",
  },
  selectedText: {
    fontWeight: "bold",
    color: Colors.DEFAULT_BLACK,
    marginLeft: 5,
    fontSize: 18,
    lineHeight: 18 * 1.4,
    fontFamily: "POPPINS-BLACK",
  },
  alertBadge: {
    position: "absolute",
    right: -2,
    top: -6,
    borderRadius: 10,
    backgroundColor: Colors.DEFAULT_YELLOW,
    justifyContent: "center",
    alignItems: "center",
    height: 20,
    width: 20,
  },
  alertBadgeText: {
    fontSize: 12,
    lineHeight: 12 * 1.4,
  },
  searchContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    borderWidth: 1,
    borderColor: Colors.DEFAULT_GREY,
    height: 45,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  searchSections: {
    marginLeft: 10,
    marginRight: 10,
    alignItems: "center",
    fontFamily: "Comfortaa-Regular",
  },
  categoriesContainer: {
    marginTop: 5,
  },
  listContainer: {
    paddingVertical: 5,
    zIndex: -5,
  },
  // horizontalListContainer: {
  //   marginTop: 30,
  // },
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
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontFamily: "Comfortaa-Bold",
  },
  sortListContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: Colors.DEFAULT_WHITE,
    marginTop: 8,
    elevation: 1,
  },
  sortListItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.DEFAULT_YELLOW,
    height: 40,
  },
  sortListItemText: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: "Poppins-Regular",
  },
});
export default HomeScreen;
