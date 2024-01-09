import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { PrimaryButton } from '../components/Button';

function PaymentDetails({onSubmit}) {
    const [cardNumber , setCardNumber ]=useState("")
    const [expiry , setExpiry ]=useState("")
    const [cvc , setCvc]=useState("")

    const handleSubmit =() =>{
        //Validate input fields and handle payment submission 
        onSubmit({
            cardNumber,
            expiry,
            cvc,
        });
    };
  return (
    <View>
        <Text>Payment Details</Text>
        <TextInput
        placeholder='Card Name'
        value={cardNumber}
        onChangeText={setCardNumber}
        />
        <TextInput
        placeholder='Expiry Date'
        value={expiry}
        onChangeText={setExpiry}
        />
        <TextInput
        placeholder='CVC'
        value={cvc}
        onChangeText={setCvc}
        />
        <PrimaryButton title="Submit Payment" onPress={handleSubmit}/>


    </View>
  );
}

export default PaymentDetails;
