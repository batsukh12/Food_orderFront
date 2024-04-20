import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Separator, WelcomeCard } from "../component";
import { Colors } from "../const";
import { StorageService } from "../service";
import { useDispatch } from "react-redux";
import { GeneralAction } from "../actions";
const welcome_content = [
  {
    img: "wel1",
    title: "Дуртай хоолоо захиал ",
    desc: "Хоол захиалахад илүү хялбар амархан боллоо. Та өөрийн хүссэн зүйлийг захилахад л болно.",
  },
  {
    img: "welcome2",
    title: "Өөрт ойр байрлах ",
    desc: "Маш энгийн та өөрийн хүргэлтийн хаягийг оруулснаар танд хамгийн ойр үйлчлэх болно.",
  },
  {
    img: "welcome3",
    title: "Түргэн шуурхай ",
    desc: "Таны захиалгыг цаг алдалгүй гүйцэтгэж гар дээр хүргэж өгөх болно.",
  },
];

const pageStyle = (isActive) =>
  isActive ? styles.page : { ...styles.page, backgroundColor: "grey" };

const Paging = ({ index }) => {
  return (
    <View style={styles.pageContainer}>
      {[...Array(welcome_content.length).keys()].map((_, i) =>
        i === index ? (
          <View style={pageStyle(true)} key={i} />
        ) : (
          <View style={pageStyle(false)} key={i} />
        )
      )}
    </View>
  );
};

const WelcomeScreen = ({ navigation }) => {
  const [welcomeListIndex, setWelcomeListIndex] = useState(0);
  const welcomeList = useRef();
  const onViewRef = useRef(({ changed }) => {
    setWelcomeListIndex(changed[0].index);
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const pageScroll = () => {
    welcomeList.current.scrollToIndex({
      index: welcomeListIndex < 2 ? welcomeListIndex + 1 : welcomeListIndex,
    });
  };
  const dispatch = useDispatch();
  const navigate = () => {
    StorageService.setFirstUse().then(() => {
      dispatch(GeneralAction.setFirstUse());
    });
    // navigation.navigate("SignIn");
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent />

      <View style={styles.welcomeListContainer}>
        <FlatList
          ref={welcomeList}
          data={welcome_content}
          keyExtractor={(item) => item.title}
          horizontal
          pagingEnabled
          overScrollMode="never"
          viewabilityConfig={viewConfigRef.current}
          onViewableItemsChanged={onViewRef.current}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <WelcomeCard {...item} />}
        />
        <Paging index={welcomeListIndex} />
        {welcomeListIndex === 2 ? (
          <TouchableOpacity
            style={styles.startBtn}
            activeOpacity={0.8}
            onPress={() => navigate()}
          >
            <Text style={styles.startBtnText}>Get Start</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => welcomeList.current.scrollToEnd()}
            >
              <Text style={styles.buttonText}>SKIP</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={() => pageScroll()}
            >
              <Text style={styles.buttonText}>NEXT</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  welcomeListContainer: {
    flex: 1,
    width: "100%",
  },
  pageContainer: {
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 50,
  },
  page: {
    height: 8,
    width: 15,
    backgroundColor: Colors.DEFAULT_GREEN,
    borderRadius: 32,
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 34,
    marginRight: 34,
    marginBottom: 50,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 16 * 1.4,
  },
  button: {
    backgroundColor: Colors.LIGHT_GREEN,
    paddingVertical: 20,
    paddingHorizontal: 11,
    borderRadius: 32,
  },
  startBtn: {
    backgroundColor: Colors.DEFAULT_GREEN,
    paddingVertical: 5,
    paddingHorizontal: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    width: "50%",
    marginBottom: 60,
    marginTop: 14,
    left: "25%", // Center horizontally
  },
  startBtnText: {
    fontSize: 20,
    color: Colors.DEFAULT_WHITE,
    lineHeight: 20 * 1.4,
  },
});

export default WelcomeScreen;
