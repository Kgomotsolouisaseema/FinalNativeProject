// import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import React , {useEffect ,useState} from 'react';
import { db } from '../config/firebase';
import {collection ,doc , getDoc , getDocs , setDoc} from "firebase/firestore"

import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../views/consts/Colors';
import Card from '../components/Card';



const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

const HomeScreen = ({navigation}) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);

   //FUNCTION TO HANDLE ADDING TO CART

   const handleAddToCart = async (id ,user) => {
    try {
      const selectedItem = foodCategories.find((item) => item.id === id);

      if (selectedItem) {
        const userId = user.userId; // Replace 'userId' with the 
        console.log("userId" , userId)
        const cartItemRef = doc(collection(db, `users/${userId}/cartItems`), selectedItem.id);
        await setDoc(cartItemRef, selectedItem);
        setCartItems([...cartItems, selectedItem]); // Update local cart items state if needed
        console.log("Item added to cart and Firestore successfully:", selectedItem);
      } else {
        console.log("Item not found.");
      }
    } catch (error) {
      console.error("Error adding item to cart and Firestore:", error);
    }
  };


  //FUCNTION  TO HANDLE CATEGORIES NAVIGATION AND DISPLAY 
  // const handleBreakfastnav = ()=>{
  //   console.log("Breafast Avatar Clicked ")
  //   navigation.navigate("Breakfast")
  //  }
  
   const handleLunchNav = ()=>{
    console.log("Lunch Avatar Clicked ")
    navigation.navigate("Lunch")
   }
  
   const handleDessertNav = ()=>{
    console.log("Dessert Avatar Clicked ")
    navigation.navigate("Dessert")
   }
  
   const handleDrinksNav = ()=>{
    console.log("Drinks Avatar Clicked ")
    navigation.navigate("Drinks")
   }


  useEffect(() => {
    const fetchFoodCategories = async () => {
      try {
        const categoriesSnapshot = await getDocs(collection(db, "Categories"));
        const catergoriesData = categoriesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFoodCategories(catergoriesData);
        console.log( "text ",catergoriesData.title)
      
        setSelectedItems(catergoriesData);
        

        // console.log(foodCategories, "food categories");
      } catch (error) {
        console.error("Error fetching food categories:", error);
      }
    };
    fetchFoodCategories();
  }, []);

  // const handleFoodItemPress = async (foodItemId) => {
  //   console.log("food item ", foodItemId);
  //   try {
  //     //CREATING REFERENCE TO SPECIFIC DOCUMENT IN MENU COLLECTION
  //     const menuItemRef = doc(collection(db, "Menu"), foodItemId); //,foodItemId
     
  //     //FETCH DOCUMENT DATA
  //     const docSnapshot = await getDoc(menuItemRef);
  //     console.log(docSnapshot, "Snapshot");
  //     if (docSnapshot.exists()) {
  //       //IF DOCUMENT IS THERE, use docSnapShot.id TO ACCESS DOCUMENTS FIELD
  //       const menuItemData = docSnapshot.data();

  //       // console.log("Category Data:", menuItemData);
  //       navigation.navigate("ItemDetails", { menuItemData });
  //       // setSelectedItems(menuItemData)

  //       //NOW YOU CAN USE THE foodItemData TO DISPLAY/PROCESS THE DOCUMENT
  //     } else {
  //       console.log("Document not found");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching menu item", error);
  //   }
  // };







  const ListCategories = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.categoriesListContainer}>
        {foodCategories.map((category, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('MenuScreen' , category)}>
            <View
              style={{
                backgroundColor:
                  selectedCategoryIndex == index
                    ? COLORS.primary
                    : COLORS.secondary,
                ...style.categoryBtn,
              }}>
              <View style={style.categoryBtnImgCon}>
                <Image
                  source={category.image}
                  style={{height: 35, width: 35, resizeMode: 'cover'}}
                />
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginLeft: 10,
                  color:
                    selectedCategoryIndex == index
                      ? COLORS.white
                      : COLORS.primary,
                }}>
                {category.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={style.header}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 28}}>Hello,</Text>
            <Text style={{fontSize: 28, fontWeight: 'bold', marginLeft: 10}}>
              Kgomotso
            </Text>
          </View>
          <Text style={{marginTop: 5, fontSize: 22, color: COLORS.grey}}>
            What would like to Chow on Today !!
          </Text>
        </View>
        <Image
          source={require('../assets/frontgirl.png')}
          style={{height: 50, width: 50, borderRadius: 25}}
        />
      </View>
      <View
        style={{
          marginTop: 40,
          flexDirection: 'row',
          paddingHorizontal: 20,
        }}>
        <View style={style.inputContainer}>
          <Icon name="search" size={28} />
          <TextInput
            style={{flex: 1, fontSize: 18}}
            placeholder="Search for food"
          />
        </View>
        <View style={style.sortBtn}>
          <Icon name="tune" size={28} color={COLORS.white} />
        </View>
      </View>
      <View>
        <ListCategories />
      </View>
      <Card/>
      {/* <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={foods}
        renderItem={({item}) => <Card food={item} />}
      /> */}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: COLORS.light,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 220,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;