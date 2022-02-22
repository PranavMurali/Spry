import React,{useState} from 'react'
import { StyleSheet, Text, View, Dimensions,TouchableOpacity,ScrollView} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon,SearchBar} from "react-native-elements";
import { useNavigation} from '@react-navigation/core';
import SearchInput, { createFilter } from 'react-native-search-filter';

const Bus = () => {
const navigation = useNavigation();
const buses= [
  {
      regNo: 'TN10AS1234',
      routeNo: '1',
      capacity: '50',
      status: 'Available',
  },
  {
      regNo: 'TN10AS1235',
      routeNo: '2',
      capacity: '50',
      status: 'Available',
  },
  {
      regNo: 'TN10AS1236',
      routeNo: '3',
      capacity: '50',
      status: 'Available',
  },
  {
      regNo: 'TN10AS1237',
      routeNo: '4',
      capacity: '50',
      status: 'Not Available',
  },
];
const KEYS_TO_FILTERS = ['regNo', 'routeNo', 'capacity', 'status'];
const [searchTerm, setSearchTerm] = useState('');
const data = buses.filter(createFilter(searchTerm, KEYS_TO_FILTERS))
  return (
    <>
    <View>
        <TouchableOpacity
        onPress={() => navigation.navigate('Menu')}
        style={tw`bg-gray-100 absolute top-8 left-3 z-50 p-3 rounded-full shadow-lg`}>
            <Icon name='arrowleft' color="black" type='antdesign' />
        </TouchableOpacity>
    </View>
    <View style={tw`pt-20 `}>
    <SearchBar
        placeholder="Type Here..."
        onChangeText={(term) => { setSearchTerm(term) }} 
        value={searchTerm}
      />
    </View> 
    <ScrollView>
          {data.map(bus => {
            return (
              <TouchableOpacity style={tw` mx-10 mt-2 rounded p-2 shadow-lg bg-gray-900`} onPress={()=>alert(bus.status)} key={bus.regNo}>
                <View style={tw`flex-row`}>
                  <Icon name='bus' color="white" type='font-awesome' />
                  <Text style={tw`ml-4 text-white font-bold text-xl`}>{bus.regNo}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>   
    </>
  )
}

export default Bus