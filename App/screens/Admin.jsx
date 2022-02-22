import React from 'react';
import { StyleSheet, Text, View, Dimensions,TouchableOpacity, TouchableHighlight} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation} from '@react-navigation/core';

const Admin = () => {
  const navigation = useNavigation();
    return (
    <>
      <View>
          <TouchableHighlight underlayColor="lightgrey"
          onPress={() => navigation.navigate('Menu')}
          style={tw`bg-gray-100 absolute top-8 left-3 z-50 p-3 rounded-full shadow-lg`}>
              <Icon name='arrowleft' color="black" type='antdesign' />
          </TouchableHighlight>
      </View>
      
    </>
  )
}

export default Admin