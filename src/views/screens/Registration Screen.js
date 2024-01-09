import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from "react-native";
import COLORS from "../consts/Colors";
import {doc , setDoc} from "firebase/firestore"
import {auth , db}from "../config/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";
import {useNavigation} from "@react-navigation/native"


const RegistrationScreen = () => {
  const navigation = useNavigation();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [address, setAddress] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardDetails, setCardDetails] = useState("");


  const handleRegistration =async()=>{
    try{
      const userCredential = await createUserWithEmailAndPassword(auth ,email,password);
      const user = userCredential.user;

      //Store the uses details {name,surname ect} in firestore 
      const userDocRef = doc(db, 'users',user.uid); //created a collection called users and storing the users details there
      await setDoc(userDocRef,{
        email:user.email,
        name: name,
        surname:surname,
        contactNum:contactNum,
        address:address,
        cardHolder:cardHolder,
        cardDetails:cardDetails,
      });
      navigation.navigate("Profile" , {
        email:user.email,
        name: name,
        surname:surname,
        contactNum:contactNum,
        address:address,
        cardHolder:cardHolder,
        cardDetails:cardDetails,

      })

      console.log("Handle Registration btn Clicked" , cardDetails);
      // setIsUserLoggedIn(true);
      navigation.navigate('Home');
    }catch(error){
      console.error("Error at Registration" , error);
    }
   }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register Here:</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Surname"
        value={surname}
        onChangeText={(text) => setSurname(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Contact Number"
        value={contactNum}
        onChangeText={(text) => setContactNum(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <Text style={styles.subheading}>Card Details:</Text>
      <TextInput
        placeholder="Card Holder's Name"
        value={cardHolder}
        onChangeText={(text) => setCardHolder(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Card Number"
        value={cardDetails}
        onChangeText={(text) => setCardDetails(text)}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleRegistration} style={styles.button}>
        <Text style={styles.buttonText}>REGISTER</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.primary,
  },
  subheading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.primary,
  },
  input: {
    width: "80%",
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    height: 60,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: "80%",
    alignItems: "center",
  },
 
  buttonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontWeight: 'bold', 
    fontSize: 18
  },
});

export default RegistrationScreen;
