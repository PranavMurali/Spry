import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
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
import Bus from "./screens/Bus";
import { initializeApp } from "firebase/app";

import { getFirestore, collection, getDocs } from 'firebase/firestore'

export default function App() {
    useKeepAwake();

    //Firebase configuration
    const firebaseConfig = {
    apiKey: "AIzaSyDfCO4PmzD7WnD-vGh_YIaZS9lv2kwlnNY",
    authDomain: "spry-c6f20.firebaseapp.com",
    projectId: "spry-c6f20",
    storageBucket: "spry-c6f20.appspot.com",
    messagingSenderId: "455979811101",
    appId: "1:455979811101:web:bc1c4d4b433df1796ea1f4"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore();

    // Collection Reference
    const colRef = collection(db,'id');

    // Get all documents
    getDocs(colRef).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            console.log(doc.data());
        });
    })
    return (
        <NavigationContainer>
            <SafeAreaProvider>
                <KeyboardAvoidingView
                    style={tw`flex-1`}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
                >
                    <Stack.Navigator>
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
    );
}
