import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    TouchableHighlight,
    SafeAreaView,
    StatusBar,
    FlatList,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/core";

const Admin = () => {
    const navigation = useNavigation();
    const DATA = [
        {
            id: "4",
            title: "Manage buses",
        },
        {
            id: "3",
            title: "Manage drivers",
        },
        {
            id: "2-3da1-471f-bd96-145571e29d72",
            title: "Manage routes",
        },
        {
            id: "1",
            title: "View maintenance logs",
        },
    ];

    const Item = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );

    const renderItem = ({ item }) => <Item title={item.title} />;

    return (
        <>
            <View>
                <TouchableHighlight
                    underlayColor="lightgrey"
                    onPress={() => navigation.pop()}
                    style={tw`bg-gray-100 absolute top-8 left-3 z-50 p-3 rounded-full shadow-lg`}
                >
                    <Icon name="arrowleft" color="black" type="antdesign" />
                </TouchableHighlight>
            </View>
            <View style={tw`flex flex-col justify-center items-center top-10`}>
                <Text style={tw`text-3xl text-center`}>Central Console</Text>
            </View>

            <SafeAreaView style={styles.container}>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    onMagicTap={() => {}}
                />
            </SafeAreaView>
        </>
    );
};

export default Admin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: "#bfbebb",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
        alignSelf: "center",
    },
});
