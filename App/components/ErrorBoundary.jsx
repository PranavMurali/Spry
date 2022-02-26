import React, { component } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            Alert.alert(
                "Oops",
                "Something went wrong. Please try again later.",
                [{ text: "OK", onPress: () => navigation.navigate("Menu") }]
            );
        }

        return this.props.children;
    }
}
