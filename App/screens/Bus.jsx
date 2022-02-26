import React,{useState} from 'react'
import { StyleSheet, Text, View, Dimensions,TouchableOpacity,ScrollView} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon} from "react-native-elements";
import { useNavigation} from '@react-navigation/core';
import SearchInput, { createFilter } from 'react-native-search-filter';
import { useStateValue ,dispatch} from "../StateProvider";

const Bus = () => {

    const [{buses},dispatch] = useStateValue();
    console.log("buses",buses);
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
        <ScrollView>
            {buses.map(bus => {
                return (
                <TouchableOpacity style={tw` mx-10 mt-2 rounded p-2 shadow-lg bg-gray-900`} onPress={()=>alert(bus.RouteNo)} key={bus.RouteNo}>
                    <View style={tw`flex-row`}>
                    <Icon name='bus' color="white" type='font-awesome' />
                    <Text style={tw`ml-4 text-white font-bold text-xl`}>{bus.BusId}</Text>
                    </View>
                </TouchableOpacity>
                )
            })}
            </ScrollView>   
        </>
    )
    }

export default Bus 