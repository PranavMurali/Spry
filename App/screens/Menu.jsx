import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    TouchableHighlight,
    StatusBar,
    SafeAreaView,
    FlatList,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/core";
import { SpeedDial, Switch } from "react-native-elements";
import { useStateValue } from "../StateProvider";

const Menu = () => {
    const navigation = useNavigation();
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = useState(false);
    const [{ admin }, dispatch] = useStateValue();
    const DATA = [
        {
            id: "4",
            title: "History",
        },
        {
            id: "3",
            title: "Profile",
        },
        {
            id: "2-3da1-471f-bd96-145571e29d72",
            title: "Settings",
        },
        {
            id: "1",
            title: "Logout",
        },
    ];
    useEffect(() => {
        dispatch({
            type: "SET_ADMIN",
            payload: checked,
        });
    }, [checked]);

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
                    onPress={() => navigation.navigate("Map")}
                    style={tw`bg-gray-100 absolute top-8 left-3 z-50 p-3 rounded-full shadow-lg`}
                >
                    <Icon name="arrowleft" color="black" type="antdesign" />
                </TouchableHighlight>
            </View>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    onMagicTap={() => {}}
                />
            </SafeAreaView>
            <Switch
                style={tw`bg-gray-100 absolute bottom-20 self-center`}
                value={checked}
                onValueChange={(val) => setChecked(val)}
            />
            {admin ? (
                <>
                    <SpeedDial
                        isOpen={open}
                        icon={{
                            name: "devices-other",
                            color: "#fff",
                            type: "material",
                        }}
                        openIcon={{ name: "close", color: "#fff" }}
                        onOpen={() => setOpen(!open)}
                        onClose={() => setOpen(!open)}
                    >
                        <SpeedDial.Action
                            icon={{
                                name: "developer-board",
                                color: "#fff",
                                type: "material",
                            }}
                            title="Fleet Console"
                            onPress={() => navigation.navigate("Fleet")}
                        />

                        <SpeedDial.Action
                            icon={{
                                name: "engineering",
                                color: "#fff",
                                type: "material",
                            }}
                            title="Admin Console"
                            onPress={() => navigation.navigate("Admin")}
                        />

                        <SpeedDial.Action
                            icon={{
                                name: "calendar",
                                color: "#fff",
                                type: "antdesign",
                            }}
                            title="Timeline"
                            onPress={() => navigation.navigate("Timeline")}
                        />
                    </SpeedDial>
                </>
            ) : (
                <Text style={tw`top-20 left-4`}>Admin</Text>
            )}
        </>
    );
};

export default Menu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,
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
