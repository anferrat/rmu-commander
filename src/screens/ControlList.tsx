import React from 'react'
import { View, StyleSheet } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types/RootStackParamList';
import ControlList from '../features/control-list';

type ControlListScreenProps = NativeStackScreenProps<RootStackParamList, 'List'>

function ControlListScreen({ route, navigation }: ControlListScreenProps): React.JSX.Element {

    const navigateToCreate = () => navigation.navigate('Create', { id: null })
    const navigateToEdit = (configId: number) => navigation.navigate('Create', { id: configId })

    return (
        <View style={styles.container}>
            <ControlList
                navigateToEdit={navigateToEdit}
                navigateToCreate={navigateToCreate} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
});

export default ControlListScreen;