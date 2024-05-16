import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  Dimensions,
} from "react-native";
import { Colors, Fonts } from "../const";
import { Separator, BookmarkCard } from "../component";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { StorageService } from "../service";

const ListItemSeparator = () => (
  <View
    style={{
      height: 0.8,
      backgroundColor: Colors.DEFAULT_GREY,
      width: "100%",
      marginVertical: 10,
    }}
  />
);
const { height, width } = Dimensions.get("window");
const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

const BookmarkScreen = ({ navigation }) => {
  const [bookmarks, setBookmarks] = useState([]);

  const fetchBookmarks = useCallback(async () => {
    try {
      const bookmarksJSON = await AsyncStorage.getItem("bookmarks");
      const userId = await StorageService.getUser();
      if (bookmarksJSON) {
        const parsedBookmarks = JSON.parse(bookmarksJSON);

        const userBookmarks = parsedBookmarks.filter(
          (bookmark) => bookmark.userId === userId
        );

        setBookmarks(userBookmarks);
      }
    } catch (error) {
      console.error("Error while fetching bookmarks:", error);
    }
  }, []);
  const itemCount = useSelector(
    (state) => state?.bookmarkState?.bookmarks || 0
  );
  console.log(itemCount);
  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  // Subscribe to changes in AsyncStorage
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchBookmarks();
    });

    return unsubscribe;
  }, [navigation, fetchBookmarks]);
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
        <Text style={styles.headerTitle}>Хадгалсан </Text>
      </View>
      <FlatList
        style={styles.bookmarkList}
        data={itemCount}
        keyExtractor={(item) => item?.restaurantId}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => <Separator height={10} />}
        ListFooterComponent={() => <Separator height={10} />}
        ItemSeparatorComponent={() => <ListItemSeparator />}
        renderItem={({ item }) => {
          return (
            <BookmarkCard
              restaurantId={item.restaurantId}
              name={item.name}
              images={item.images}
              location={item.location}
              tags={item.tags}
              navigate={() =>
                navigation.navigate("Restaurant", {
                  restaurantId: item.restaurantId,
                })
              }
            />
          );
        }}
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
  bookmarkList: {
    marginHorizontal: 20,
  },
});

export default BookmarkScreen;
