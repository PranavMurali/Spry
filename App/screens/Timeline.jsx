import React from 'react'
import { StyleSheet, Text, View, Dimensions,TouchableOpacity} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation} from '@react-navigation/core';

const Timeline = () => {
  const navigation = useNavigation();
  return (
        <>
        <View>
            <TouchableOpacity
            onPress={() => navigation.navigate('Menu')}
            style={tw`bg-gray-100 absolute top-8 left-3 z-50 p-3 rounded-full shadow-lg`}>
                <Icon name='arrowleft' color="black" type='antdesign' />
            </TouchableOpacity>
        </View>
        <View style={tw`p-2 pl-5 pb-8 top-20 bg-gray-700 m-2 max-w-md rounded-lg`}>
          <Text style={tw`text-2xl font-bold text-white text-left`}>Timeline</Text>

          <View style={{flexDirection: 'column'}}>
            <View style={tw` mt-2 ml-2 w-3 h-3 rounded-full -left-1.5 border border-white border-gray-400 bg-gray-700`}></View> 
            <Text style={tw` ml-4 text-sm font-normal text-gray-400`}>18th - 27th February 2022</Text>
            <Text style={tw` ml-4 text-lg font-semibold text-white`}>Develop Prototype and Basic Functionality</Text>
            <Text style={tw` ml-4 text-base font-normal text-gray-400`}>All of the pages are made using Tailwind CSS and React native components. Expo modules are used to create frontend functionality like location tracking and MapView.</Text>
          </View>

          <View style={{flexDirection: 'column'}}>
            <View style={tw` mt-4 ml-2 w-3 h-3 rounded-full -left-1.5 border border-white border-gray-400 bg-gray-700`}></View> 
            <Text style={tw` ml-4 text-sm font-normal text-gray-400`}>27th February 2022</Text>
            <Text style={tw` ml-4 text-lg font-semibold text-white`}>Provide a clean mockup and functioning application</Text>
            <Text style={tw` ml-4 text-base font-normal text-gray-400`}>Firebase wrapped application to provide functionality such as bus tracking, Admin fleet tracking and personnel allotment.A go Backend to facilitate smooth and fast on the "go" caclulations.</Text>
          </View>

          <View style={{flexDirection: 'column'}}>
            <View style={tw` mt-4 ml-2 w-3 h-3 rounded-full -left-1.5 border border-white border-gray-400 bg-gray-700`}></View> 
            <Text style={tw` ml-4 text-sm font-normal text-gray-400`}>February 2022 - ...</Text>
            <Text style={tw` ml-4 text-lg font-semibold text-white`}>Perfecting the backend functionality , adding new features and improving UI/UX</Text>
            <Text style={tw` ml-4 text-base font-normal text-gray-400`}>Proceed to develop and integrate better client and admin side functionality to allow service providers and the users to get the most out of the transit.</Text>
          </View>

        </View>


        </>
  )
}

export default Timeline