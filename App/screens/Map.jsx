import { StyleSheet, Text, View, Dimensions,TouchableOpacity} from "react-native";
import MapView, {
    MAP_TYPES,
    UrlTile,
} from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation} from '@react-navigation/core';
import React, { useCallback, useMemo, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';


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
    container: {
      flex: 1,
      backgroundColor: 'grey',
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
    },
});


const MapScreen = () => {
    const navigation = useNavigation();
    const bottomSheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    return (
        <>
        <View>
            <TouchableOpacity
            onPress={() => navigation.navigate('Menu')}
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
          <BottomSheet
            index={1}
            snapPoints={snapPoints}
          >
            <View style={styles.contentContainer}>
              <Text>Awesome 🎉</Text>
            </View>
          </BottomSheet>
        </>
    );
};

export default MapScreen;