import React from "react";
import {
    FlatList,
    Text,
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import tw from "tailwind-react-native-classnames";

const data = [
    {
        id: "1",
        title: "Home",
        image: "../as.png",
        screen: "Camera",
    },
    {
        id: "2",
        title: "Map",
        image: "../as.png",
        screen: "Map",
    },
];

const Homescreen = ({ navigation }) => {
    return (
        <View style={tw`bg-white h-full`}>
            <SafeAreaView style={tw`mt-20`}>
                <Text style={tw`text-black font-bold text-2xl`}>Spry</Text>
                <FlatList
                    data={data}
                    horizontal
                    keyExtractor={(item) => item.id}
                    style={tw`ml-5`}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate(item.screen)}
                            style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-700 m-2 w-40 rounded-lg`}
                        >
                            <View>
                                <Image
                                    source={{ uri: item.image }}
                                    style={{
                                        width: 120,
                                        height: 120,
                                        resizeMode: "contain",
                                    }}
                                />
                                <Text
                                    style={tw`mt-2 text-lg font-semibold text-white`}
                                >
                                    {item.title}
                                </Text>
                                <Icon
                                    style={tw`p-2 bg-black rounded-full w-10 mt-4 `}
                                    name="arrowright"
                                    color="white"
                                    type="antdesign"
                                />
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </SafeAreaView>
        </View>
    );
};

export default Homescreen;
