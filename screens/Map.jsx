import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, {
    MAP_TYPES,
    PROVIDER_DEFAULT,
    UrlTile,
} from "react-native-maps";

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
    return (
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
    );
};

export default MapScreen;
