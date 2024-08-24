import React from 'react'
import { View, StyleSheet } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types/RootStackParamList';
import CreateConfig from '../features/create';

type CreateScreenProps = NativeStackScreenProps<RootStackParamList, 'Create'>

function CreateScreen({ route, navigation }: CreateScreenProps): React.JSX.Element {
    return (
        <View style={styles.container}>
            <CreateConfig
                goBack={navigation.goBack}
                id={route.params.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
});

export default CreateScreen;