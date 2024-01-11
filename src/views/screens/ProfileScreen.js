import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getDoc, doc, getFirestore , updateDoc  } from "firebase/firestore";
import { getAuth , onAuthStateChanged } from "firebase/auth";
import COLORS from "../consts/Colors";
import { PrimaryButton } from "../components/Button";
import { ScrollView } from "react-native-gesture-handler";

const ProfileScreen = ({navigation}) => {
  const { width } = Dimensions.get("window");
  const cardWidth = width / 2 - 20;

  const [user, setUser] = useState(0);
  console.log("Profile screen users" , user)
  const auth = getAuth();
  const db = getFirestore();

  // useEffect(() => {
  //   // Fetch user details from Firebase and set in userDetails state
  //   const unsubscribe = onAuthStateChanged(auth , (user) => {
  //     if (user) {
  //       // User is signed in, fetch user details
  //       // Update userDetails state with fetched user details
  //     }else{
  //       Alert.alert("Welcome back :",user ,"Have a Happy Meal")
  //     }
  //   });

  //   return () => unsubscribe(); //on component will unmount/clean /react lifecycles
  // }, []);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // const user = auth.currentUser;
        const user = onAuthStateChanged(auth,async (user)=>{
          console.log({ user })

          if (user) {
            const userDocRef = doc(db, "users", user.uid); 
            const userDocSnapshot = await getDoc(userDocRef);
            if (userDocSnapshot.exists()) {
              setUser(userDocSnapshot.data());
            }
          }

        })
        console.log(user)
       
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    // If user data is not available yet, render loading UI or redirect to login screen
    return <Text>Loading...</Text>;
  }

  //HANDLE LOGOUT LOGIC 
  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign the user out
     
      console.log("User logged out successfully");
      Alert.alert("Thank you , See you  later")
       // Redirect the user to the onboarding screen
      navigation.navigate('BoardScreen');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <View style={styles.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}> Profile Screen</Text>
      </View>
     
      <ScrollView> 
       <View style={styles.profileContainer}>
         <Image
          source={{ uri: user.profilePicture }}
          style={styles.profileImage}
        /> 
          <Image
          source={require('../assets/frontgirl.png')}
          style={styles.profileImage}
        /> 

         <Text style={styles.userName}>{`${user.name} ${user.surname}`}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Address</Text>
        <Text style={styles.infoText}>{user.address}</Text>
        <Text style={styles.infoLabel}>Card Details</Text>
        <Text style={styles.infoText}>{user.cardDetails}</Text>
      </View>

      <View>
      <Text style={styles.orderHistoryTitle}>Order History</Text>
      {user.orders> 0 ?(
        <FlatList 
        data={user.orders}
        keyExtractor={(item)=>  item.id}
        renderItem={({item})=>(
            <View style={styles.orderItem}>
            <Text>Date: {item.date}</Text>
            <Text>Total: ${item.total.toFixed(2)} </Text>
            </View>   
        )}
        />
      ):(
        <Text>No order history Available</Text>
      )}
      

      </View>
     
      <View>
        
        <View style={{ marginHorizontal: 30 }}>
              <PrimaryButton title="LOGOUT" onPress={handleLogout} />
            </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  profileImage: {
    height: 125,
    width: 125,
    borderRadius: 60,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  userEmail: {
    fontSize: 18,
    color: COLORS.grey,
    marginTop: 5,
  },
  infoContainer: {
    margin: 20,
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    marginTop: 5,
  },
  orderHistoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 20,
  },
  orderItem: {
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,

  },
});

export default ProfileScreen;
