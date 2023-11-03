import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';

import {doc , setDoc} from "firebase/firestore"
import { db}from "../config/firebase"

function CheckoutScreen({navigation}) {
  const [name, setName] = useState('Kgomotso');
  const [total, setTotal]= useState(0)
  const [items , setItems]=useState({cartItems:[]})

  // Function that handles stripe payment gateway
  const payment = async () => {
    try {
      // Sending request
      const response = await fetch('https://tinys-7lwb.onrender.com/pay', {
        method: 'POST',
        body: JSON.stringify({
          name,
          amount: Math.floor(total * 100), //total 
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) return Alert.alert(data.message);
      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
      });
      if (initSheet.error) return Alert.alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if (presentSheet.error) return Alert.alert(presentSheet.error.message);
      Alert.alert('Payment complete, thank you!');
      navigation.navigate('Checkout'); 
     
      // Sends the order information to firestore
      const orderRef = doc(db, 'orders', userId); 
      await setDoc(orderRef, {
        items: {
          dish: items.cartItems, 
          total: total, 
          timestamp: serverTimestamp(), // Note: 'serverTimestamp' function is not defined in the provided code
        },
      }, { merge: true });
      console.log('Order captured successfully');
    } catch (err) {
      console.log('Order not captured to database', err);
    }
  };

  return (
    <View>
      <Text>CheckoutScreen</Text>
      {/* Additional JSX components can be added here */}
    </View>
  );
}

export default CheckoutScreen;
