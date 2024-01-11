import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useStripe } from "@stripe/stripe-react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../consts/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

function OrderSummary({ menuCards }) {
  const navigation = useNavigation(); //Getting navigation object
  const [userCardDetails, setUserCardDetails] = useState(null);
  const [expDate, setExpDate] = useState();
  const [cvC, setCvcNum] = useState();
  const stripe = useStripe();
  const params  = useRoute();
  const totalPrice= params.params || 0;

  const [loading , setLoading]=useState(false);

  // console.log("price ", userCardDetails)

  useEffect(() => {
    // Function to fetch user's card details from Firestore
    const fetchUserCardDetails = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));

        // Assuming you want to retrieve the first card details for the user (if available)
        querySnapshot.forEach((doc) => {
          // Fetching the first user's card details for demonstration purposes
          setUserCardDetails(doc.data());
          // You might need to filter the card details based on user ID or other criteria
          // and handle multiple cards if applicable
          return;
        });
      } catch (error) {
        console.error("Error fetching user card details:", error);
      }
    };

    // Invoke the function to fetch user's card details
    fetchUserCardDetails();
  }, []);



  const payment = async () => {
    setLoading(true);
    try {
      // Sending request to server on render.com
      const response = await fetch("https://tinys-7lwb.onrender.com/pay", {
        // const response = await fetch("https://localhost:8000/pay", {
        method: "POST",
        body: JSON.stringify({
          name:"kgomotso",
          amount: Math.floor(totalPrice * 100),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) return Alert.alert(data.message);
      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        merchantDisplayName: "kgomotso",
        paymentIntentClientSecret: clientSecret,
      });
      if (initSheet.error) return Alert.alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if (presentSheet.error) return Alert.alert(presentSheet.error.message);
      Alert.alert("Payment complete, thank you!");
      navigation.navigate("OrderPreparing" , totalPrice );
      console.log("Order captured successfully");
    } catch (err) {
      console.log("Order not captured to database", err);
    } finally{
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View>
        {/* Header Section */}
        <View style={styles.header}>
          <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Order Summary</Text>
        </View>
        <View>
          {userCardDetails && (
            <View style={styles.card}>
              <Text  style={styles.cardText}>User's Card Details:</Text>
              <Text  style={styles.cardText}>Customer Name: {userCardDetails.name}</Text>
              <Text style={styles.cardText}>Customer Surname: {userCardDetails.surname}</Text>
              <Text  style={styles.cardText}>Card Details : {userCardDetails.cardDetails}</Text>
              <TextInput
               style={styles.input}
                placeholder="Expiration Date (MM/YY)"
                value={userCardDetails.expDate}
                onChangeText={setExpDate}
              />
              <TextInput
               style={styles.input}
                placeholder="CVC"
                value={userCardDetails.cvc}
                onChangeText={setCvcNum}
              />
            </View>
          )}
        </View>
        {/* FlatList to display menu items */}
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 70 }}
          data={menuCards}
          renderItem={({ item, index }) => (
            <CartCard item={item} index={index} />
          )}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
          ListFooterComponent={() => {
            const formattedPrice = totalPrice
              ? `R${totalPrice.toFixed(2)}`
              : "R0.00";
            return (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: 15,
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    Total Price
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {formattedPrice}
                  </Text>
                </View>
                <View style={{ marginHorizontal: 30 }}>
                  {/* <TouchableOpacity onPress={() => {payment,  navigation.navigate("OrderPreparing" , totalPrice ); }}> */}
                  <TouchableOpacity onPress={payment}>
                    {loading ? (
                      <ActivityIndicator size="xlarge" color="#f93a6d" /> 
                    ):(
                      <Text style={styles.checkoutButton} >PAY</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: COLORS.white,
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    padding: 10,
    textAlign: "center",
    borderRadius: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  cardContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: COLORS.grey,
    borderWidth: 3,
    borderRadius: 3,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});

export default OrderSummary;
