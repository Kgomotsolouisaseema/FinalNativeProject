import { useNavigation, useRoute } from '@react-navigation/native';
import { addDoc, collection } from 'firebase/firestore';
import React from 'react';
import { Text, View } from 'react-native';

function CheckoutScreen() {
const navigation = useNavigation(); //Getting navigation object

const params  = useRoute();
const {totalPrice}= params.totalPrice || 0;
console.log("price ", totalPrice)

  const tokenizeCard = async () => {
    try {
        const cardDetails = {
            number: '4242424242424242', // Replace with the actual card number
            expMonth: 12, // Replace with the actual expiration month
            expYear: 25, // Replace with the actual expiration year
            cvc: '123', // Replace with the actual CVC
        };
        const cardToken = await stripe.createTokenWithCard(cardDetails);
        // The cardToken contains the tokenized card information
        console.log(cardToken);
    } catch (error) {
        console.error('Error tokenizing card:', error);
    }
}
//Handles the payment function

const payment = async () => {
    try {
        // Sending request to server on render.com
        const response = await fetch("https://tinys-7lwb.onrender.com", {
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
        await addDoc(collection(db, 'Orders'), {
            userId: userId,
            dish: items.cartItems,
            total: total,
            date: Date()
        })
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
