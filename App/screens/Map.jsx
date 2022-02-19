import React from "react";
import { StyleSheet, Text, View, Dimensions,TouchableOpacity} from "react-native";
import MapView, {
    MAP_TYPES,
    PROVIDER_DEFAULT,
    UrlTile,
} from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation} from '@react-navigation/core';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
});

const MapScreen = () => {
    const navigation = useNavigation();
    return (
        <>
        <View>
            <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}>
                <Icon name="menu" type="material-community" color="#000" size={30} />
            </TouchableOpacity>
        </View>
        <View style={styles.container}>
            <MapView
                style={styles.map}
                mapType={MAP_TYPES.STANDARD}
                rotateEnabled={false}
                style={{ flex: 1 }}
                style={styles.map}
                showsUserLocation={true}
            >
            <UrlTile
                urlTemplate="http://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
                maximumZ={19}
            />
            </MapView>
        </View>
        </>
    );
};

export default MapScreen;
