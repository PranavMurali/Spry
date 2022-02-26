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
          onPress={() => navigation.navigate('Map')}
          style={tw`bg-gray-100 absolute top-8 left-3 z-50 p-3 rounded-full shadow-lg`}>
              <Icon name='arrowleft' color="black" type='antdesign' />
        </TouchableHighlight>
      </View>
      <View style={tw`flex flex-col justify-center items-center top-10`}>
          <Text style={tw`text-3xl text-center`}>Central Console</Text>
      </View>

      <View style={tw`shadow-xl top-20 left-8 w-80 h-40`}>
      <Text style={tw`bg-white rounded-xl`}>
        <View style={tw`mt-16`}>
          <Text style={tw`text-xl font-bold text-gray-900 `}>Science of Chemistry</Text>
        </View>
      </Text>
    </View>
      
    </>
  )
}

export default Admin