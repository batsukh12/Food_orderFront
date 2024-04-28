import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Colors, Fonts, image } from "../const";
import Ionicons from "react-native-vector-icons/Ionicons"; // Importing Ionicons for the checkmark icon

const payments = [
  {
    img: "social",
    title: "Social Pay",
    desc: "Social Pay",
  },
  {
    img: "qr",
    title: "Qpay",
    desc: "Qpay",
  },
  {
    img: "credit",
    title: "Credit Card",
    desc: "Credit Card",
  },
];

const Payment = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleSelectPayment = (index) => {
    setSelectedPayment(index); // Update the selected payment option
  };

  return (
    <View style={styles.container}>
      {/* Map through the payments array */}
      {payments.map((payment, index) => (
        <TouchableOpacity
          key={index}
          style={styles.paymentItem}
          activeOpacity={0.8}
          onPress={() => handleSelectPayment(index)}
        >
          <Image style={styles.paymentIcon} source={image[payment.img]} />
          <View style={styles.paymentDetails}>
            <Text style={styles.paymentTitle}>{payment.title}</Text>
            <Text style={styles.paymentDesc}>{payment.desc}</Text>
          </View>
          {selectedPayment === index && (
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={Colors.DEFAULT_YELLOW}
              style={styles.checkmarkIcon}
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  paymentItem: {
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    padding: 10,
    borderRadius: 20,
    backgroundColor: Colors.LIGHT_GREY,
  },
  paymentIcon: {
    width: 45,
    height: 45,
    marginRight: 10,
    borderRadius: 25,
  },
  paymentDetails: {
    flex: 1,
  },
  paymentTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: Colors.DEFAULT_BLACK,
  },
  paymentDesc: {
    fontFamily: "Poppins-Bold",
    fontSize: 12,
    color: Colors.DEFAULT_GREY,
  },
  checkmarkIcon: {
    marginLeft: "auto", // Push the icon to the right side
  },
});

export default Payment;
