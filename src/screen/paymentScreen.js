import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  StatusBar,
  Dimensions,
  Image,
} from "react-native";
import { Separator } from "../component";
import { Colors, Fonts } from "../const";
import Ionicons from "react-native-vector-icons/Ionicons";

const { height, width } = Dimensions.get("window");
const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;
const PaymentScreen = ({ navigation }) => {
  const [cardSection1, setCardSection1] = useState("");
  const [cardSection2, setCardSection2] = useState("");
  const [cardSection3, setCardSection3] = useState("");
  const [cardSection4, setCardSection4] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const expirationRef = useRef(null);
  const cvvRef = useRef(null);

  const handlePayment = () => {
    const cardNumber = `${cardSection1}${cardSection2}${cardSection3}${cardSection4}`;
    if (!cardNumber || !expirationDate || !cvv) {
      Alert.alert("Анхаар ", "Бүх талбарыг бөглөнө үү.");
      return;
    }

    Alert.alert("Амжилттай ", "Картын мэдээллийг амжилттай хадгаллаа.");
  };

  const handleCardSection1Change = (text) => {
    setCardSection1(text);
    if (text.length === 4) {
      inputRef2.current.focus();
    }
  };

  const handleCardSection2Change = (text) => {
    setCardSection2(text);
    if (text.length === 4) {
      inputRef3.current.focus();
    }
  };

  const handleCardSection3Change = (text) => {
    setCardSection3(text);
    if (text.length === 4) {
      inputRef4.current.focus();
    }
  };

  const handleCardSection4Change = (text) => {
    setCardSection4(text);
    if (text.length === 4) {
      expirationRef.current.focus();
    }
  };

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
        <Text style={styles.headerTitle}>Карт </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://golomtbank.com/wp-content/uploads/2020/06/card-carbon.png",
          }}
          style={styles.image}
          resizeMode="cover"
          accessible={true}
        />
      </View>
      <Text style={styles.label}>Карт эзэмшигчийн нэр </Text>
      <TextInput
        style={styles.input}
        placeholder="Bat"
        value={expirationDate}
        onChangeText={(text) => setExpirationDate(text)}
        maxLength={5}
        ref={expirationRef}
      />
      <Text style={styles.label}>Картын дугаар </Text>
      <View style={styles.cardNumberContainer}>
        <TextInput
          style={styles.cardInput}
          placeholder="1234"
          value={cardSection1}
          onChangeText={handleCardSection1Change}
          keyboardType="numeric"
          maxLength={4}
          ref={inputRef1}
        />
        <TextInput
          style={styles.cardInput}
          placeholder="5678"
          value={cardSection2}
          onChangeText={handleCardSection2Change}
          keyboardType="numeric"
          maxLength={4}
          ref={inputRef2}
        />
        <TextInput
          style={styles.cardInput}
          placeholder="9012"
          value={cardSection3}
          onChangeText={handleCardSection3Change}
          keyboardType="numeric"
          maxLength={4}
          ref={inputRef3}
        />
        <TextInput
          style={styles.cardInput}
          placeholder="3456"
          value={cardSection4}
          onChangeText={handleCardSection4Change}
          keyboardType="numeric"
          maxLength={4}
          ref={inputRef4}
        />
      </View>

      {/* Expiration Date Input */}
      <Text style={styles.label}>Дуусах огноо </Text>
      <TextInput
        style={styles.input}
        placeholder="MM/YY"
        value={expirationDate}
        onChangeText={(text) => setExpirationDate(text)}
        keyboardType="numeric"
        maxLength={5}
        ref={expirationRef}
      />

      {/* CVV Input */}
      <Text style={styles.label}>CVV</Text>
      <TextInput
        style={styles.input}
        placeholder="123"
        value={cvv}
        onChangeText={(text) => setCvv(text)}
        keyboardType="numeric"
        secureTextEntry
        maxLength={3}
        ref={cvvRef}
      />

      {/* Payment Button */}
      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Хадгалах </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#ffffff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Comfortaa-Bold",
    lineHeight: 20 * 1.4,
    width: setWidth(80),
    textAlign: "center",
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 20,
    evaluate: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "80%",
    height: 170,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    fontFamily: "Comfortaa-Bold",
  },
  cardNumberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontFamily: "Comfortaa-Bold",
  },
  cardInput: {
    width: "22%",
    borderWidth: 1,
    borderColor: "#cccccc",
    backgroundColor: Colors.LIGHT_GREY,
    borderRadius: 5,
    padding: 8,
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Comfortaa-Bold",
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.DEFAULT_GREY,
    backgroundColor: Colors.LIGHT_GREY,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "Comfortaa-Bold",
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: Colors.DEFAULT_GREEN,
    borderRadius: 10,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Comfortaa-Bold",
  },
});

export default PaymentScreen;
