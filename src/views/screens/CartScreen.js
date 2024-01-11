import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image  , TouchableOpacity, Alert} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/Colors';
import { PrimaryButton } from '../components/Button';
import { collection ,  deleteDoc,  doc, getDocs ,  } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useNavigation,  } from '@react-navigation/native';


const CartScreen = () => {


  const [menuCards , setMenuCards]=useState([]);
 
  const [numericPrices , setNumericPrices]=useState([])
  const [totalPrice , setTotalPrice]=useState(0)
  const navigation  = useNavigation();


  const cartRef = collection(db , "cartItems")

  const getItems = async () => {
    console.log(cartRef)
    let data = await getDocs (cartRef)
    const extractPrices = data.docs.map((doc)=>doc.data().price); 
    const numericPrices = extractPrices.map((price)=>parseFloat(price));
    //CALCULATE THE TOTAL PRICE USING REDUCE
    const total = numericPrices.reduce((partialSum , price)=> partialSum + price , 0);
    setMenuCards(data.docs.map((doc)=> ({...doc.data(),id: doc.id})))
    setNumericPrices(numericPrices); //set numericPrices in the state
    // setPrices(data.docs.map((doc)=> ({...doc.data().price})))
    //EXTRACT PRICE VALUES FROM THE ARRAY OF OBJECTS
    
    setTotalPrice(total);
    console.log("Toal price:" , total)
  }

  // const sum = prices.reduce((partialSum, a) => partialSum + a, 0)
  const sum = numericPrices.reduce((partialSum,price)=>partialSum + price  , 0);
  const formatSum = sum.toFixed(2); //FORMATS THE SUM TO HAVE 2 DECIMAL PLACES
  console.log( " Total sum of prices ",sum);


  const deleteFood =async (id)=>{
    console.log("delete food ",cartRef,id)
    let task = doc(cartRef,id)
    console.log("task: " )
    await deleteDoc (task).then(
      promise => {
        Alert.alert("item deleted")
        getItems("")
      }
    ).catch()
    getItems()
  }


  useEffect(()=>{
    getItems()

  },[])


  const incrementQuantity = (index)=>{
    console.log("increase btn clicked");
    const updatedCartItems = [...menuCards];
    updatedCartItems[index].quantity += 1 ;
    console.log("Updated Quantity:" , updatedCartItems[index].quantity);
    setMenuCards(updatedCartItems);

    //RECALCULATE
    const total = updatedCartItems.reduce(
      (partialSum , item)=> partialSum + item.quantity * item.price,
      0
    );
    setTotalPrice(total);
  };


  

  const decrementQunatity = (index)=>{
    console.log("decrese btn clicked");
    const updatedCartItems = [...menuCards];
    if(updatedCartItems[index].quantity > 1){
      updatedCartItems[index].quantity -= 1 ;
      console.log("Updated Quantity:", updatedCartItems[index].quantity);
      setMenuCards(updatedCartItems);

      //Recalculates total price
      const total = updatedCartItems.reduce(
        (partialSum , item)=> partialSum + item.quantity * item.price , 0
      );
      setTotalPrice(total); 
    }
  };

  




 

  const CartCard = ({item , index}) => {

    return (
      <View style={styles.cartCard}>
        <Image source={{ uri: item.image}} style={{ height: 90, width: 80 ,overflow:"hidden" ,borderRadius:8,}} />
        {/* <View style={{ height: 100, marginLeft: 10, paddingVertical: 20, flex: 1 }}> */}
        <View style={{ marginLeft: 10, paddingVertical: 20, flex: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.productName}</Text>
          <Text style={{ fontSize: 13, color: COLORS.grey }}>{item.Intro}</Text>
          <Text style={{ fontSize: 17, fontWeight: 'bold' }}>R{item.price}</Text>
        </View>

        <View style={{ marginRight: 20, alignItems: 'center' }}>
          {/* <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.quantity}</Text> */}
         
           <View style={styles.actionBtn}>
        <TouchableOpacity onPress={() => decrementQunatity(index)} >
            <Icon name="remove" size={25} color={COLORS.white} />
          </TouchableOpacity>

          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.quantity}</Text>

          <TouchableOpacity onPress={() => incrementQuantity(index)} >
            <Icon name="add" size={25} color={COLORS.white} />
          </TouchableOpacity>
         
        </View>
        <View>
        <TouchableOpacity onPress={() => deleteFood(item.id)} >
            <Icon name="delete" size={25} color={COLORS.black} />
          </TouchableOpacity>
        </View>

        </View>
       
      </View>
    );
  };
  


  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>

      {/* Header Section */}
      <View style={styles.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Cart</Text>
      </View>
      {/* FlatList to display menu items */}
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
        data={menuCards}
        renderItem={({ item , index }) => <CartCard item={item} index={index} />}
        keyExtractor={(item , index)=> index.toString()}
        ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
        ListFooterComponent={() => (
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total Price</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}> R{totalPrice.toFixed(2)}</Text>
            </View>
            <View style={{ marginHorizontal: 30 }}>
              <PrimaryButton title="CHECKOUT" onPress={()=>  navigation.navigate("Orders", totalPrice) }  />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
   header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  cartCard: {
    // height: 130,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
     // Shadow properties for iOS
     shadowColor: '#000',
     shadowOffset: {
       width: 0,
       height: 2,
     },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
     // Elevation for Android
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderwidth: 5, // border
    borderColor: COLORS.primary,
   

  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default CartScreen;
