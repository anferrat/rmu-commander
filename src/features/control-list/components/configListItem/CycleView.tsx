import { Text } from '@ui-kitten/components';
import React from 'react'
import { View, StyleSheet } from 'react-native'

interface CycleViewProps {
    cycle: boolean
    value: number
}

function CycleView({ cycle, value }: CycleViewProps): React.JSX.Element {
    return (
        <View
            style={styles.container}>
            <Text
                category='s2'
                style={styles.title}>
                {cycle ? 'On' : 'Off'}:
            </Text>
            <Text
                category='p1'>{value.toFixed(0)} ms</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 6
    },
    title: {
        fontWeight: 'bold',
        width: 30
    }
});

export default CycleView;