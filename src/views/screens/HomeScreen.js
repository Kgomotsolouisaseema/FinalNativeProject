import React , {useEffect ,useState} from 'react';
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
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from "../consts/Colors"
import { db } from '../config/firebase';
import {addDoc, collection ,doc , getDoc , getDocs , setDoc} from "firebase/firestore"
// import { useRoute } from '@react-navigation/native';




const HomeScreen = ({navigation , user}) => {

  console.log(user);
  // const {width} = Dimensions.get('window');  //screen or window 
  // const cardWidth = width / 2 - 20;
  // console.log(cardWidth)
  const [menuCards , setMenuCards]=useState(null);
  // console.log( "menu items", menuCards)
  const [cart , setCart]=useState([]);
  const [itemIndex , setItemIndex]=useState(1);
 

  const cartRef = collection(db , "cartItems")


  useEffect(() => {
    const fecthMenuItems = async () => {
      try {
        const categoriesSnapshot = await getDocs(collection(db,"Menu"));
        const menuItemsData = categoriesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMenuCards(menuItemsData);
      
        console.log( "Menu items",menuItemsData );
      } catch (error) {
        console.error("Error fetching menuu Items:", error);
      }
    };
    fecthMenuItems();
  }, []);





  //THIS IS THE SMALL CATEGORIES ON THE TOP OF THE MENU , BREAKFASTFAST , LUNCH ,DRINKS AND DESSERT
  const ListCategories = () => {
    const [categories , setCategories]=useState([]);  //this should hold the whole menu items 
    // console.log( "the whole menu " ,categories)
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
    // console.log( "the selected category  " ,selectedCategoryIndex)


    useEffect(() => {
      const fetchFoodCategories = async () => {
        try {
          const categoriesSnapshot = await getDocs(collection(db, "Breakfast"));
          const catergoriesData = categoriesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCategories(catergoriesData);
        
      
  
          // console.log( "food categories",categories );
        } catch (error) {
          console.error("Error fetching food categories:", error);
        }
      };
      fetchFoodCategories();
    }, []);


    
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.categoriesListContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setSelectedCategoryIndex(index)}>
            <View
              style={{
                backgroundColor:
                  selectedCategoryIndex == index
                    ? COLORS.primary
                    : COLORS.secondary,
                ...style.categoryBtn,
              }}>
                {/* the view of the inner white part of the image at the category  */}
              <View style={style.categoryBtnImgCon}>
                <Image
                  source={category.Image}
                  style={{height: 35, width: 35, resizeMode: 'cover' , borderRadius:5}}
                />
              </View>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 'bold',
                  marginLeft: 10,
                  color:
                    selectedCategoryIndex == index
                      ? COLORS.white
                      : COLORS.primary,
                }}>
                {category.Name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
    );
  };

  //THIS IS THE CARDS FOR ALL THE MENU ITEMS , WHEN YOU PRESS THE PARTICULAR ITEM , YOU CAN VIEW THE FULL CONTENT OF PICKED ITEM
  // const Card = ({navigation , menuCards}) => {
  //   return (
  //     <TouchableHighlight
  //       underlayColor={COLORS.white}
  //       activeOpacity={0.9}
  //       onPress={() => navigation.navigate('DetailsScreen', menuCards )}
  //       style={{marginVertical:20  , }}
  //       >

  //       <View style={style.card}>
  //         <View style={{alignItems: 'center',}}> {/*top: -40*/}
  //           <Image source={{uri: menuCards.Image}} style={{height: 120, width: 120}} />
  //         </View>

  //         <View style={{marginHorizontal: 20}}>
  //           <Text style={{fontSize: 18, fontWeight: 'bold'}}>{menuCards.Name}</Text>
  //           <Text style={{fontSize: 14, color: COLORS.grey, marginTop: 2}}>
  //             {menuCards.Intro}
  //           </Text>
  //         </View>

  //         <View
  //           style={{
  //             marginTop: 10,
  //             marginHorizontal: 20,
  //             flexDirection: 'row',
  //             justifyContent: 'space-between',
  //           }}>
  //           <Text style={{fontSize: 18, fontWeight: 'bold'}}>
  //             R{menuCards.Price}
  //           </Text>
  //           <View style={style.addToCartBtnContainer}> 
  //           {/*ADD TO CART ICON*/}
  //           <TouchableOpacity style={style.addToCartBtn}
  //           underlayColor={COLORS.primary}
  //           onPress={async ()=> {
  //             await addDoc (collection(db, "cartItems" ), {
  //               productName: menuCards.Name, 
  //               price : menuCards.Price,
  //               image: menuCards.Image,
  //               quantity: 1
  //             })
  //           }}
  //           >
  //           <Icon name="add" size={20} color={COLORS.white} />
  //           </TouchableOpacity>
  //           </View>

  //         </View>
  //       </View>
  //     </TouchableHighlight>
  //   );
  // };
  const Card = ({ navigation, menuCards }) => {
    return (
      <TouchableHighlight
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('DetailsScreen', menuCards)}
        style={{ marginVertical: 20 }}
      >
        <View style={style.card}>
          {/* Image and content within card */}
          <View style={{ alignItems: 'center' }}>
            <Image source={{ uri: menuCards.Image }} style={style.cardImage} />
            {/* Rest of your content */}
            <View style={{ marginHorizontal: 20 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                {menuCards.Name}
              </Text>
              <Text style={{ fontSize: 14, color: COLORS.grey, marginTop: 2 }}> 
                {menuCards.Intro} 
               </Text>
            </View>
  
            <View
              style={{
                marginTop: 10,
                marginHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold',marginRight:18 }}>
                R{menuCards.Price}
              </Text>
              <View style={style.addToCartBtnContainer}>
                {/* ADD TO CART ICON */}
                <TouchableOpacity
                  style={style.addToCartBtn}
                  underlayColor={COLORS.primary}
                  onPress={async () => {
                    await addDoc(collection(db, 'cartItems'), {
                      productName: menuCards.Name,
                      price: menuCards.Price,
                      image: menuCards.Image,
                      quantity: 1,
                    });
                  }}
                >
                  <Icon name="add" size={20} color={COLORS.white}  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };
  

  
  return (
    //this is the very top of the home screen .
    <ScrollView>

   
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={style.header}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 25}}>Hello,</Text>
            <Text style={{fontSize: 25, fontWeight: 'bold', marginLeft: 10}}>
              Kgomotso
            </Text>
          </View>
          <Text style={{marginTop: 5, fontSize: 22, color: COLORS.grey}}>
            What would you like to eat today !
          </Text>
        </View>
        <Image
          source={require('../assets/frontgirl.png')}
          // source={{ uri: user.profilePicture }}
          style={{height: 55, width: 55, borderRadius: 25}}
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
        {/* the top menu items categories*/ }
        <ListCategories />
      </View>
      {/*These are the cards for each food */ }
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={menuCards}
        renderItem={({item}) => <Card menuCards={item} navigation={navigation}/>}
      />
      
    </SafeAreaView>
    </ScrollView>
  );
};
const {width} = Dimensions.get('window'); //specifies the type of window opened , different from screen
const cardWidth = width / 2 - 20;

const style = StyleSheet.create({
  

  header: {
    marginTop: 40,
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
    height: 300,
    width: cardWidth,  //CardWidth not accessible
    marginVertical: 25, 
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 18,
    padding:16 ,
    backgroundColor: COLORS.white,
    elevation: 10, // Set the elevation for the card
    shadowColor: 'red', // Set shadow color if needed
    shadowOffset: { width: 0, height: 10 }, // Set shadow offset
    shadowOpacity: 0.3, // Set shadow opacity
    shadowRadius: 2, // Set shadow radius
    borderwidth: 5, // border
    borderColor: "black",
  },
  cardImage: {
    height: 120,
    width: 120,
    borderRadius: 10, // Assuming you want rounded corners for the image
    marginBottom: 10, // Adjust as needed
  },
  addToCartBtnContainer:{
    flex:1

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