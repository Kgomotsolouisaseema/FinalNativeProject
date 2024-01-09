
import React, { useState} from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {  useRoute } from '@react-navigation/native';
import COLORS from '../consts/Colors';

function OrderPreparing({navigation}) {

    const [price , setPrice]=useState(0)

const params  = useRoute();
const {totalPrice}= params.totalPrice || 0;
console.log("price ", totalPrice)

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>

   
   <View style={styles.container} >
    <Text style={styles.header}> Order Preparing </Text>

    {/*Order Confirmation Message*/ }
    <Text style={styles.confrimationText}>Your Order is being processed , Thank you </Text>

    {/*Order Details or Summary */}
    <View style={styles.orderDetails}>
        <Text>Order Number: TINY001</Text>
        <Text>Total Price : R 120.00</Text>
    </View>

    {/*Order Status Update */}
    <View style={styles.statusUpdate}>
        <ActivityIndicator size="large" color="#f93a6d" />
        <Text>We are Finalizing your Order .... </Text>
    </View>
    {/*Further Action  */}
    <View style={styles.actionButtons}>
        <TouchableOpacity onPress={()=> navigation.navigate("Home")}>
            <Text>Continue Shopping</Text>
        </TouchableOpacity>
    </View>
   </View>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
    },
    header: {
        fontSize: 24 , 
        fontWeight: 'bold',
        marginBottom: 20,
    },
    confrimationText: {
        marginBottom: 20 , 
        textAlign: 'center',
    },
    orderDetails:{
        marginBottom: 20,
    },
    statusUpdate:{
        alignItems: "center",
        marginBottom:20,
    },
    actionButtons:{
        flexDirection : "row",
        justifyContent: "space-between",
        width: "80%",
    },
    button : {
        backgroundColor: "black",
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
    }

})
export default OrderPreparing;
