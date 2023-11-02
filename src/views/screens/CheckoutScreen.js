import React from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Alert,
  } from "react-native";
  

function CheckoutScreen() {
  const [name , setName ]=useState("Kgomotso")


  //Function that handles stripe payment gateway
    const payment = async () => {
        try {
            // Sending request
            const response = await fetch("https://stripecardnodejs.onrender.com/pay", {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    amount: Math.floor(total * 100),
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = await response.json();
            if (!response.ok) return Alert.alert(data.message);
            const clientSecret = data.clientSecret;
            const initSheet = await stripe.initPaymentSheet({
                paymentIntentClientSecret: clientSecret
            });
            if (initSheet.error) return Alert.alert(initSheet.error.message);
            const presentSheet = await stripe.presentPaymentSheet({
                clientSecret
            });
            if (presentSheet.error) return Alert.alert(presentSheet.error.message)
            Alert.alert('Payment complete, thank you!')
            navigation.navigate('OrderPreparing')
            // Sends the order information to firestore
            const orderRef = doc(db, 'orders', userId);
            await setDoc(orderRef, {
                items: {
                    dish: items.cartItems,
                    total: total,
                    timestamp: serverTimestamp()
                }
            }, { merge: true })
            console.log('Order captured successfully')
        } catch (err) {
            console.log('Order not captured to database', err)
        }
    }
  return (
    <View>
        <Text>CheckoutScreen</Text>
    </View>
  );
}

export default CheckoutScreen;
