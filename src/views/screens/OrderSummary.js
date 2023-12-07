import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { PrimaryButton } from "../components/Button";

function OrderSummary({ totalPrice, menuCards }) {
  return (
    <View>
      <Text> Order Summary </Text>
      <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
        {/* Header Section */}
        
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
          ListFooterComponent={() => (
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
                  {" "}
                  R{totalPrice.toFixed(2)}
                </Text>
              </View>
              <View style={{ marginHorizontal: 30 }}>
                <PrimaryButton
                  title="CHECKOUT"
                  onPress={() => navigation.navigate("Checkout", totalPrice)}
                />
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

export default OrderSummary;
