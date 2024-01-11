import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../consts/Colors";
import { SecondaryButton } from "../components/Button";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const DetailsScreen = ({ route }) => {
  // const route = useRoute();
  const navigation = useNavigation();
  const item = route.params;
  console.log("Recieved Item", item);
  const [favItem, setFavItem] = useState([]);
  console.log("favitem array", favItem);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedQuantity , setSelectedQuantity]=useState(1);

  //function to toggel if favItem is in the state or not

  const favBtn = (item) => {
    console.log("fav btn clicked");
    //CHECK IF THE ITEM IS ALREADY IN THE FAVORITES LIST
    const isFavorite = favItem.some((fav) => fav.id === item.id);
    //IF ITS ALREADY A FAV , REMOVE IT ,LESS ADD IT
    if (isFavorite) {
      const updatedFavItems = favItem.filter((fav) => fav.id !== item.id);
      console.log("Is favorite? ", isFavorite);
      setFavItem(updatedFavItems);
    } else {
      setFavItem([...favItem, item]);
    }
  };

  //FUNCTION TO ADD ITEM TO CART AT DETAILS

  const addItemTocart = async () => {
    //validates if item has valid productName  and Price properties
    // if (item && item.productName && item.Price && item.Image) {
    //ADDS THE ITEM TO THE FIRESTORE COLLECTION
    try {
      await addDoc(collection(db, "cartItems"), {
        productName: item.Name,
        price: item.Price,
        image: item.Image,
      });
      navigation.navigate("CartScreen", item);
      // }else{
      //   console.error("Invalid item data:" , item);
      // }
    } catch (error) {
      console.log("error with nav", error);
    }
  };

 

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex:1 }}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Details</Text>
      </View>
     

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 280,
          }}
        >
          <Image source={item.Image} style={{ height: 220, width: 220 }} />
        </View>
       
      </ScrollView>
      <View style={style.details}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 25, fontWeight: "bold", color: COLORS.white }}
            >
              {item.Name}
            </Text>
            <View style={style.iconContainer}>
              <TouchableOpacity onPress={() => favBtn(item.id)}>
                {/* <Icon name="favorite-border" color={COLORS.primary} size={25} /> */}
                <Icon
                  name={
                    favItem.includes(item.id)
                      ? "favorite"
                      : "favorite-border"
                  }
                  color={
                    favItem.includes(item.id) ? "red" : "black"
                  } // Change color to red when liked
                  size={28}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={style.detailsText}>{item.Description}</Text>
          <View style={{ marginTop: 40, marginBottom: 40 }}>
            <SecondaryButton title="Add To Cart" onPress={addItemTocart} />
          </View>
        </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    // position: "absolute",
    bottom: 0,
  },
  iconContainer: {
    backgroundColor: COLORS.white,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,
    color: COLORS.white,
  },
});

export default DetailsScreen;
