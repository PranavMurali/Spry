import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import { useKeepAwake } from "expo-keep-awake";
import MapScreen from "./screens/Map";
import tw from "tailwind-react-native-classnames";
import Menu from "./screens/Menu";
import Timeline from "./screens/Timeline";
import Admin from "./screens/Admin";
import Fleet from "./screens/Fleet";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import reducer, { initialState } from "./reducer";
import { StateProvider } from "./StateProvider";
import Bus from "./screens/Bus";

export default function App() {
    useKeepAwake();

    //Firebase configuration
    const firebaseConfig = {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        projectId: "spry-c6f20",
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID,
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore();

    // Collection Reference
    const colRef = collection(db, "id");

    // Get all documents
    getDocs(colRef).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            console.log(doc.data());
        });
    });
    return (
        <StateProvider initialState={initialState} reducer={reducer}>
            <NavigationContainer>
                <SafeAreaProvider>
                    <KeyboardAvoidingView
                        style={tw`flex-1`}
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
                    >
                        <Stack.Navigator initialRouteName="Map">
                            <Stack.Screen
                                name="Map"
                                component={MapScreen}
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <Stack.Screen
                                name="Menu"
                                component={Menu}
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <Stack.Screen
                                name="Timeline"
                                component={Timeline}
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <Stack.Screen
                                name="Admin"
                                component={Admin}
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <Stack.Screen
                                name="Fleet"
                                component={Fleet}
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <Stack.Screen
                                name="Bus"
                                component={Bus}
                                options={{
                                    headerShown: false,
                                }}
                            />
                        </Stack.Navigator>
                    </KeyboardAvoidingView>
                </SafeAreaProvider>
            </NavigationContainer>
        </StateProvider>
    );
}
