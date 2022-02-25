import React, { useState, useEffect, useMemo, useRef } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Dimensions,
    TouchableOpacity,
    TouchableHighlight,
} from "react-native";
import MapView, { MAP_TYPES, Marker } from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/core";
import MapModal from "../components/MapModal";
import stops from "../stops.json";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";

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
        marginTop: 30,
        height: Dimensions.get("window").height,
        backgroundColor: "white",
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
        borderRadius: 40,
        padding: 10,
    },

    stops: {
        flex: 1,
        alignItems: "stretch",
    },
});

const MapScreen = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const markersInit = [
        {
            title: "Mayo Hall Manipal Hospital",
            latitude: 12.457774224055761,
            longitude: 77.38053544805545,
        },
        {
            title: "Domlur.",
            latitude: 12.103930552235786,
            longitude: 77.05061196436114,
        },
        {
            title: "K.R.Puram Rly.Stn,Marathhalli Bridge",
            latitude: 12.035640565856784,
            longitude: 77.56726554880552,
        },
    ];
    const [markers, setMarkers] = useState([]);
    const [location, setLocation] = useState({
        coords: {
            latitude: 13.0827,
            longitude: 80.2707,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
    });
    const [errorMsg, setErrorMsg] = useState(null);
    const [destination, onChangeDestination] = useState("");

    let filteredData = stops.places.filter((item) => {
        return (
            item.name.toLowerCase().indexOf(destination.toLowerCase()) !== -1
        );
    });

    const setDestination = (destination) => {
        onChangeDestination(destination);
    };

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            axios
                .post("https://location.free.beeceptor.com/locations", {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                })
                .then((res) => {
                    console.log(res.data);
                });
            setMarkers(markersInit);
        })();
    }, []);

    return (
        <>
            <View style={styles.container}>
                <View>
                    <TouchableHighlight
                        underlayColor="lightgrey"
                        onPress={() => navigation.navigate("Menu")}
                        style={tw`bg-gray-100 absolute top-8 left-3 z-50 p-3 rounded-full shadow-lg`}
                    >
                        <Icon
                            name="menu"
                            type="material-community"
                            color="#000"
                            size={30}
                        />
                    </TouchableHighlight>
                </View>
                <MapView
                    region={{
                        latitude: location["coords"]["latitude"],
                        longitude: location["coords"]["longitude"],
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    style={styles.map}
                    mapType={MAP_TYPES.STANDARD}
                    rotateEnabled={false}
                    style={{ flex: 1 }}
                    style={styles.map}
                    showsUserLocation={true}
                    provider="google"
                    annotations={markersInit}
                >
                    {/* <UrlTile
                        urlTemplate="http://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
                        maximumZ={19}

                    /> */}
                    {markers.map((marker, index) => (
                        <Marker
                            key={index + "_" + Date.now()}
                            title={marker.title}
                            coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude,
                            }}
                            icon={require("../assets/bus-stop.png")}
                        />
                    ))}
                </MapView>
            </View>
            <TouchableHighlight
                underlayColor="lightgrey"
                onPress={() => setModalVisible(true)}
                style={tw`bg-gray-100 absolute bottom-8 self-center z-50 p-3 rounded-full shadow-lg`}
            >
                <Icon
                    name="arrow-up-drop-circle-outline"
                    type="material-community"
                    color="#000"
                    size={30}
                />
            </TouchableHighlight>
            <MapModal
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
            >
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeDestination}
                    value={destination}
                    placeholder="Search Destination"
                    returnKeyType="search"
                    onSubmitEditing={() => setDestination(filteredData[0].name)}
                />
                <Text>{destination}</Text>
                <ScrollView>
                    {filteredData.map((stop, index) => (
                        <TouchableOpacity
                            key={index}
                            style={tw`flex-row mt-3`}
                            underlayColor="black"
                            onPress={() => setDestination(stop.name)}
                        >
                            <View>
                                <Text style={tw`font-black mt-2 mx-3 w-80`}>
                                    {stop.name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </MapModal>
        </>
    );
};

export default MapScreen;
