import React, { useState, useEffect, useMemo, useRef } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Dimensions,
    TouchableHighlight,
    Alert,
    TouchableOpacity,
} from "react-native";
import { setJSExceptionHandler } from "react-native-exception-handler";
import MapView, { MAP_TYPES, Marker } from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/core";
import MapModal from "../components/MapModal";
import stops from "../stops.json";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { useStateValue ,dispatch} from "../StateProvider";
import Bus from "./Bus";

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

    button: {
        backgroundColor: "#dbdbdb",
        padding: 0,
        borderRadius: 40,
        width: "30%",
        height: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "black",
        padding: 0,
        fontSize: 15,
    },

    stops: {
        flex: 1,
        alignItems: "stretch",
    },
});

const MapScreen = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [pref, setPref] = useState("distance");
    const [toggle, setToggle] = useState(true);

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
    const [buses, setBuses] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [destination, onChangeDestination] = useState("");

    const exceptionhandler = (exceptionString) => {
        Alert.alert("Oops", "Something went wrong. Please try again later.", [
            { text: "OK", onPress: () => navigation.navigate("Menu") },
        ]);
    };
    setJSExceptionHandler((error, isFatal) => {
        Alert.alert("Oops", "Something went wrong. Please try again later.", [
            { text: "OK", onPress: () => navigation.navigate("Menu") },
        ]);
    });

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
            setMarkers(markersInit);
        })();
    }, []);

    
    const getBuses = (s) => {
        console.log("Bus stop ", s);
        setDestination(s);
        s = s.replace(" ", "%20");
        console.log("After replacing ", s);
        var url = `https://speeeeeeeeds.herokuapp.com/getbuses?sourcelat=${location.coords.latitude}&sourcelng=${location.coords.longitude}&dest=${s}&sort=${pref}`;
        console.log(url);
        axios.get(url).then((res) => {
            console.log("res",res.data);
            setBuses(res.data);
        });
        setToggle(false);
    };
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
                    <ErrorBoundary>
                        {/* <UrlTile
                        urlTemplate="http://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
                        maximumZ={19}

                    /> */}
                        {markers
                            ? markers.map((marker, index) => (
                                  <Marker
                                      key={index + "_" + Date.now()}
                                      title={marker.title}
                                      coordinate={{
                                          latitude: marker.latitude,
                                          longitude: marker.longitude,
                                      }}
                                      icon={require("../assets/bus-stop.png")}
                                  />
                              ))
                            : () => null}
                    </ErrorBoundary>
                    <ErrorBoundary>
                        {buses
                            ? buses.map((bus, index) => (
                                  <Marker
                                      key={index + "_" + Date.now()}
                                      title={bus.RouteName}
                                      coordinate={{
                                          latitude: bus.Lat,
                                          longitude: bus.Lng,
                                      }}
                                      icon={require("../assets/moving-bus.png")}
                                  />
                              ))
                            : () => null}
                    </ErrorBoundary>
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
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        height: "20%",
                        width: "100%",
                        marginBottom: 30,
                    }}
                >
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => {
                            setPref("price");
                            getBuses(destination);

                        }}
                    >
                        <View>
                            <Text style={styles.buttonText}>Price</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => {
                            setPref("distance");
                            getBuses(destination);
                        }}
                    >
                        <Text style={styles.buttonText}>Distance</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => {
                            setPref("capacity");
                            getBuses(destination);
                        }}
                    >
                        <Text style={styles.buttonText}>Capacity</Text>
                    </TouchableHighlight>
                </View>
                {toggle ? <ScrollView>
                    {console.log("toggle", toggle)}
                    {filteredData.map((stop, index) => (
                        <TouchableHighlight
                            key={index}
                            style={tw`flex-row mt-3`}
                            underlayColor="black"
                            onPress={() => {
                                getBuses(stop.name);
                            }}
                        >
                            <View>
                                <Text style={tw`font-black mt-2 mx-3 w-80`}>
                                    {stop.name}
                                </Text>
                            </View>
                        </TouchableHighlight>
                    ))}
                </ScrollView> : 
                <ScrollView>
                {buses.map(bus => {
                    return (
                    <TouchableOpacity style={tw` mx-10 mt-2 rounded p-2 shadow-lg bg-gray-900`} onPress={()=>alert(bus.RouteNo)} key={bus.BusId}>
                        <View style={tw`flex-row`}>
                        <Icon name='bus' color="white" type='font-awesome' />
                        <Text style={tw`ml-4 text-white font-bold text-xl`}>{bus.BusId}</Text>
                        </View>
                    </TouchableOpacity>
                    )
                })}
                </ScrollView>}
            </MapModal>
        </>
    );
};

export default MapScreen;
