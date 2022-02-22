import React from 'react'
import { StyleSheet, Text, View, Dimensions,TouchableOpacity} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation} from '@react-navigation/core';
import { SpeedDial } from 'react-native-elements';

const Menu = () => {
    const navigation = useNavigation();
    const [open, setOpen] = React.useState(false);
  return (
      <>
    <View>
        <TouchableOpacity
        onPress={() => navigation.navigate('Map')}
        style={tw`bg-gray-100 absolute top-8 left-3 z-50 p-3 rounded-full shadow-lg`}>
            <Icon name='arrowleft' color="black" type='antdesign' />
        </TouchableOpacity>
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

export default Menu