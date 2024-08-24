import React from 'react'
import { View, StyleSheet } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/types/RootStackParamList'

type DevScreenProps = NativeStackScreenProps<RootStackParamList, 'Dev'>

function DevScreen({ route, navigation }: DevScreenProps): React.JSX.Element {

    return (
        <View style={styles.container}>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
});

export default DevScreen;