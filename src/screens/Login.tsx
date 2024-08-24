import React from 'react'
import { View, StyleSheet } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types/RootStackParamList';
import Login from '../features/login';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>

function LoginScreen({ route, navigation }: LoginScreenProps): React.JSX.Element {
    return (
        <View
            style={styles.container}>
            <Login />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
});

export default LoginScreen;