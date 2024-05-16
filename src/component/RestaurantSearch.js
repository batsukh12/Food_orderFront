import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors } from "../const"; // Import Colors constants
import { imageService, foodService } from "../service";
import ApiConfig from "../config";

const RestaurantSearch = ({ navigation, navigate }) => {
  const [foods, setFoods] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFoods, setFilteredFoods] = useState([]);

  const fetchFoods = useCallback(() => {
    foodService.getFoods().then((response) => {
      if (response?.status) {
        setFoods(response?.data);
      }
    });
  }, []);

  useEffect(() => {
    fetchFoods();
  }, []);

  const onSearchQueryChange = (query) => {
    setSearchQuery(query);
    const filtered = query
      ? foods.filter((food) =>
          food.name.toLowerCase().includes(query.toLowerCase())
        )
      : []; // If query is null or empty, show all foods
    setFilteredFoods(filtered);
  };

  const clearSearchQuery = () => {
    setSearchQuery("");
    setFilteredFoods(""); // Reset filteredFoods to all foods
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Feather name="search" size={25} color={Colors.DEFAULT_GREY} />
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={onSearchQueryChange}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={clearSearchQuery}>
            <Feather name="x" size={20} color={Colors.DEFAULT_GREY} />
          </TouchableOpacity>
        ) : null}
      </View>

      <FlatList
        data={filteredFoods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            navigate={() => navigation.navigate("Food", { foodId: item?.id })}
          >
            <View style={styles.restaurantItem}>
              <Image
                source={{
                  uri: imageService.getGalleryImage(
                    item.image,
                    ApiConfig.const_image.SIZE.SQUARE
                  ),
                }}
                style={styles.restaurantImage}
              />
              <Text style={styles.restaurantName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.LIGHT_GREY,
    borderWidth: 1,
    borderColor: Colors.DEFAULT_GREY,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 45,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  restaurantItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  restaurantImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
    marginLeft: 20,
  },
  restaurantName: {
    fontSize: 16,
  },
});

export default RestaurantSearch;
