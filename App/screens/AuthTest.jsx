import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { getAuth } from "firebase/auth";
import tw from "tailwind-react-native-classnames";
// import { StateProvider } from "../StateProvider";
// import reducer, { initialState } from "../reducer";

// const provider = new GoogleAuthProvider();
const auth = getAuth();
auth.useDeviceLanguage();

const AuthTest = () => {
    return (
        <>
            <View style={tw`top-10 left-10`}>
                <TouchableHighlight onPress={() => {}}>
                    <Text>Google sign in</Text>
                </TouchableHighlight>
            </View>
        </>
    );
};

export default AuthTest;
