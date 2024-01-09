import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
// import { Platform } from "react-native";
import OnBoardScreen from "./src/views/screens/OnBoardScreen";
import DetailsScreen from "./src/views/screens/DetailsScreen";
import BottomNavigation from "./src/views/navigation/BottomNavigation"
// import CartScreen from "./src/views/screens/CartScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import COLORS from "./src/views/consts/Colors";
import ProfileScreen from "./src/views/screens/ProfileScreen";
import CartScreen from "./src/views/screens/CartScreen";
import RegistrationScreen from "./src/views/screens/Registration Screen";
import LoginScreen from "./src/views/screens/LoginScreen";
// import {StripeProvider} from "@stripe/stripe-react-native"
import { useState, useEffect } from "react";

import PaymentDetails from "./src/views/screens/PaymentDetails";
import OrderPreparing from "./src/views/screens/OrderPreparing";
import OrderSummary from "./src/views/screens/OrderSummary";



const Stack = createStackNavigator();

export default function App() {
  // const [publishableKey ,setPublishableKey]= useState("pk_test_51O0f2IBysAdpfRXoy04bJHWZ6m9Ef9ff0VHCgIGqePMBoYE5tJcUjGF8AwMZ1oSkgEGzhwJZnoZFngp7e4RFgzek00sM1nXSqU");

  // const fetchPublishableKey = async () => {
  //   const key = await fetchKey(); // fetch key from your server here
  //   setPublishableKey(key);
  // };

  // useEffect(() => {
  //   fetchPublishableKey();
  // }, []);


  
  return (
    // <StripeProvider
    // publishableKey="pk_test_51O0f2IBysAdpfRXoy04bJHWZ6m9Ef9ff0VHCgIGqePMBoYE5tJcUjGF8AwMZ1oSkgEGzhwJZnoZFngp7e4RFgzek00sM1nXSqU"
    // >
    <SafeAreaProvider>
      <NavigationContainer>

        <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
        <Stack.Navigator screenOptions={{ headerShown: false}}>
       
          <Stack.Screen name="BoardScreen" component={OnBoardScreen} /> 
          <Stack.Screen name="Login" component={LoginScreen} /> 
          <Stack.Screen name="Registration" component={RegistrationScreen} /> 
          <Stack.Screen name="Home" component={BottomNavigation}  />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Orders" component={OrderSummary} />
          <Stack.Screen name="OrderPreparing" component={OrderPreparing} />
          <Stack.Screen name="PaymentDetails" component={PaymentDetails} />
         
         




        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
    // </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
