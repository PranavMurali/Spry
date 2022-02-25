import React ,{useState,useEffect}from 'react'
import { StyleSheet, Text, View, Dimensions,TouchableOpacity,TouchableHighlight} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation} from '@react-navigation/core';
import { SpeedDial, Switch} from 'react-native-elements';
import { useStateValue } from "../StateProvider";

const Menu = () => {
    const navigation = useNavigation();
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = useState(false);
    const [{ admin }, dispatch] = useStateValue();
    useEffect(() => {
      dispatch({
        type: "SET_ADMIN",
        payload: checked,
    })}, [checked]);
  return (
      <>
    <View>
        <TouchableHighlight underlayColor="lightgrey"
        onPress={() => navigation.navigate('Map')}
        style={tw`bg-gray-100 absolute top-8 left-3 z-50 p-3 rounded-full shadow-lg`}>
            <Icon name='arrowleft' color="black" type='antdesign' />
        </TouchableHighlight>
    </View>
    <Switch
        style={tw`bg-gray-100 absolute top-20 left-3`}
        value={checked}
        onValueChange={(val)=>setChecked(val)}
      />
    {admin ? ( 
    <>
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
      </>):
      <Text style={tw`top-20 left-4`}>Admin</Text>}
   

    </>
  )
}

export default Menu