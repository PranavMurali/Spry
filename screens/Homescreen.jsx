import React from 'react';
import {Text,View , SafeAreaView} from 'react-native';
import tw from 'tailwind-react-native-classnames';

const Homescreen = () => {
    return (
        <SafeAreaView style={tw`bg-black h-full`}>
               <View style={tw`bg-blue-100`}>
                    <Text >Hello</Text>
                </View>
        </SafeAreaView>
    )
}

export default Homescreen