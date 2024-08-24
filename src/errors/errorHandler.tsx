import { Alert } from "react-native";

export function errorHandler(msg: string) {
    Alert.alert('Error', msg)
}