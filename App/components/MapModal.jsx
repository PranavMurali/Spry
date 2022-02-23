// import React, { useState } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    Pressable,
    View,
    TouchableHighlight,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import React from "react";

const MapModal = (props) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
                props.setModalVisible(!props.modalVisible);
            }}
        >
            <View style={styles.modalView}>
                <TouchableHighlight
                    underlayColor="lightgrey"
                    onPress={() => props.setModalVisible(false)}
                    style={{ alignSelf: "center", borderRadius: 999 }}
                >
                    <Icon
                        name="arrow-down-drop-circle-outline"
                        type="material-community"
                        color="#000"
                        size={30}
                    />
                </TouchableHighlight>
                {props.children}
            </View>
        </Modal>
    );
};

export default MapModal;

const styles = StyleSheet.create({
    modalView: {
        marginTop: 100,
        // margin: 20,
        height: "100%",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});
