import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function OrderPreparing() {
  return (
   <View style={styles.container} >
    <Text style={styles.header}> Oder Preparing </Text>

    {/*Order Confirmation Message*/ }
    <Text style={styles.confrimationText}>Your Order is being processed , Thank you </Text>

    {/*Order Details or Summary */}
    <View style={styles.orderDetails}>
        <Text>Order Number: ABS123</Text>
        <Text>Total Price : $XX.XX</Text>
    </View>

    {/*Order Status Update */}
    <View style={styles.statusUpdate}>
        <ActivityIndicator size="large" color="orange" />
        <Text>We ARE Finalizing your Order .... </Text>
    </View>
    {/*Further Action  */}
    <View style={styles.actionButtons}>
        <TouchableOpacity>
            <Text>Continue Shopping</Text>
        </TouchableOpacity>
    </View>
   </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center'
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
