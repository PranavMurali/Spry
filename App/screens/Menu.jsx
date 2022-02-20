import React from 'react'
import { StyleSheet, Text, View, Dimensions,TouchableOpacity} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation} from '@react-navigation/core';

const Menu = () => {
    const navigation = useNavigation();
  return (
      <>
    <View>
        <TouchableOpacity
        onPress={() => navigation.navigate('Map')}
        style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}>
            <Icon name='arrowright' color="black" type='antdesign' />
        </TouchableOpacity>
    </View>
    </>
  )
}

export default Menu