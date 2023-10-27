import { useRoute } from "@react-navigation/native";

import React from "react";
import { FlatList, Text, View } from "react-native";

function MenuScreen() {
  const { params } = useRoute();

  const category = params;
  const menu = category.menu
  console.log(category.menu);

  const Items = ({name , Price}) => (
    <View>
      <Text>{name}</Text>
      <Text>{Price}</Text>
      {/* <Text>{image}</Text> */}
    </View>
  )
  console.log("menu" , Items)

  return (
    <View>
     
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={menu}
        renderItem={({ item }) => (
            <View style={{flexDirection: 'column', borderWidth:1}}>
                <Text>{item.name}</Text>
                <Text>{item.price}</Text>
            </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

export default MenuScreen;
