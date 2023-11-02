import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import HomeScreen from "./src/views/screens/HomeScreen";
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

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>

        <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
        <Stack.Navigator screenOptions={{ headerShown: true }}>
       
          <Stack.Screen name="BoardScreen" component={OnBoardScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          

          <Stack.Screen name="Home" component={BottomNavigation} />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
         


        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
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
