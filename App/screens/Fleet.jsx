import React ,{useState} from 'react'
import { StyleSheet, Text, View, Dimensions,TouchableOpacity,TextInput} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation} from '@react-navigation/core';
import { SpeedDial } from 'react-native-elements';
import {Card} from 'react-native-elements';
import { createFilter } from 'react-native-search-filter';
import DropDownPicker from 'react-native-dropdown-picker';

const Fleet = () => {
    const navigation = useNavigation();
    const [open, setOpen] = React.useState(false);
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
    const styles = StyleSheet.create({
      container: {
          flex: 1,
          backgroundColor: "#000",
          alignItems: "center",
          justifyContent: "center",
      },
      map: {
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
      },
      container: {
          flex: 1,
          backgroundColor: "grey",
      },
      contentContainer: {
          flex: 1,
          alignItems: "center",
          backgroundColor: "white",
          color: "black",
      },
  
      input: {
          height: 40,
          width: "90%",
          margin: 12,
          borderWidth: 0.2,
          borderRadius: 100,
          padding: 10,
        },
  
      stops:{
          flex: 1,
          alignItems: "stretch",
      }
  });
  return (
    <>
    <View>
        <TouchableOpacity
        onPress={() => navigation.navigate('Menu')}
        style={tw`bg-gray-100 absolute top-8 left-3 z-50 p-3 rounded-full shadow-lg`}>
            <Icon name='arrowleft' color="black" type='antdesign' />
        </TouchableOpacity>
    </View>
    <View style={tw`mt-20 flex flex-col`}>
    <TextInput style={styles.input} onChangeText={(term) => { setSearchTerm(term) }} placeholder="Search Buses"/>
    <Card>
            {data.map((u, i) => {
              return (
                <View key={i} style={tw`flex-row mt-3`}>
                  <View style={tw`flex-row content-end w-60`}>
                      <Icon name='bus' color="black" type='font-awesome' />
                      <Text style={tw`font-black mt-2 mx-3`}>{u.regNo}</Text>
                      <Text style={tw`mt-2 bg-purple-100 text-purple-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded`}>{u.routeNo}</Text>
                      <Text style={tw`mt-2 bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded`}>{u.status}</Text>
                  </View>
                  <View style={tw`flex-row content-end`}>
                      <Icon style={tw`mt-2 ml-16`} name='location' color="black" type='octicon' />
                  </View>
                </View>
              );
            })}
    </Card>
    </View>
    <SpeedDial
        isOpen={open}
        icon={{name: 'devices-other', color: '#fff', type:'material'}}
        openIcon={{ name: 'close', color: '#fff' }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
      >
        <SpeedDial.Action
          icon={{name: 'developer-board', color: '#fff', type:'material'}}
          title="Fleet Console"
          onPress={() => navigation.navigate('Fleet')}
        />

        <SpeedDial.Action
        icon={{ name: 'engineering', color: '#fff', type:'material' }}
        title="Admin Console"
        onPress={() => navigation.navigate('Admin')}
        />

        <SpeedDial.Action
        icon={{ name:'calendar',color:"#fff" ,type:'antdesign' }}
        title="Timeline"
        onPress={() => navigation.navigate('Timeline')}
        />

      </SpeedDial>
    </>
  )
}

export default Fleet