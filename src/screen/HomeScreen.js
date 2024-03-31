import React, { useEffect, useState, useCallback } from "react";
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
} from "react-native";
import { Colors, Fonts } from "../const";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {
  Separator,
  Categories,
  RestaurantCard,
  FavRestaurant,
} from "../component";
import { restaurantService } from "../service";

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

  const fetchRestaurants = useCallback(() => {
    restaurantService.getRestaurants().then((response) => {
      if (response?.status) {
        setRestaurants(response?.data);
      }
    });
  }, [restaurantService, setRestaurants]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchRestaurants);
    return unsubscribe;
  }, [navigation, fetchRestaurants]);
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={Colors.DEFAULT_GREEN}
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.background} />
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={18} color={Colors.DEFAULT_BLACK} />
          <Text style={styles.locationText}>Хүргэлтийн хаяг </Text>
          <Text style={styles.selectedText}>Home</Text>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={18}
            color={Colors.DEFAULT_BLACK}
          />
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
        <View style={styles.searchContainer}>
          <View style={styles.searchSections}>
            <Feather name="search" size={25} color={Colors.DEFAULT_GREY} />
          </View>
          <TextInput placeholder="Хайх.." />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          <Categories />
        </ScrollView>
        <ScrollView style={styles.listContainer}>
          <View style={styles.horizontalListContainer}>
            <View style={styles.listHeader}>
              <Text style={styles.listHeaderTitle}>Онцгой </Text>
              <Text style={styles.listHeaderSubtitle}>Бүгдийг харах </Text>
            </View>
            <FlatList
              data={restaurants}
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
    </View>
  );
};
const styles = StyleSheet.create({
  background: {
    marginTop: 40,
    backgroundColor: Colors.DEFAULT_WHITE,
    height: 2000,
    top: -1 * (2000 - 230),
    width: 2000,
    borderRadius: 2000,
    alignSelf: "center",
    position: "absolute",
    zIndex: -1,
  },
  container: {
    marginTop: 12,
    flex: 1,
    marginBottom: 70,
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
  },
  selectedText: {
    color: Colors.DEFAULT_BLACK,
    marginLeft: 5,
    fontSize: 16,
    lineHeight: 16 * 1.4,
  },
  alertBadge: {
    position: "absolute",
    right: -2,
    top: -10,
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
    backgroundColor: Colors.DEFAULT_WHITE,
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
  },
  categoriesContainer: {
    marginTop: 5,
  },
  listContainer: {
    paddingVertical: 5,
    zIndex: -5,
  },
  horizontalListContainer: {
    marginTop: 30,
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
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  listHeaderSubtitle: {
    color: Colors.DEFAULT_YELLOW,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
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
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
  },
});
export default HomeScreen;
