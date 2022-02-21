import React from 'react'
import { StyleSheet, Text, View, Dimensions,TouchableOpacity,Image} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation} from '@react-navigation/core';
import {Card, Button} from 'react-native-elements';

const Fleet = () => {
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
            status: 'Available',
        },
      ];

  return (
    <>
    <View>
        <TouchableOpacity
        onPress={() => navigation.navigate('Menu')}
        style={tw`bg-gray-100 absolute top-8 left-3 z-50 p-3 rounded-full shadow-lg`}>
            <Icon name='arrowleft' color="black" type='antdesign' />
        </TouchableOpacity>
    </View>
    <Card>
            <Card.Title>Fleet</Card.Title>
            <Card.Divider />
            {buses.map((u, i) => {
              return (
                <View key={i} style={tw`flex-row mt-3`}>
                    <Icon name='bus' color="black" type='font-awesome' />
                    <Text style={tw`font-black mt-2 mx-3`}>{u.regNo}</Text>
                    <Text style={tw`font-black mt-2`}>({u.routeNo})</Text>
                  <Icon style={tw`ml-40`} name='location' color="black" type='octicon' />
                </View>
              );
            })}
          </Card>
    </>
  )
}

export default Fleet