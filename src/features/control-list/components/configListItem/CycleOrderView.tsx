import { Text } from '@ui-kitten/components';
import React from 'react'
import { View, StyleSheet } from 'react-native'

interface CycleOrderViewProps {
    onFirst: null | boolean
}

function CycleOrderView({ onFirst }: CycleOrderViewProps): React.JSX.Element {
    if (onFirst !== null)
        return (
            <View
                style={styles.container}>
                <Text
                    category='s2'
                    style={styles.title}>
                    Cycle starts with:
                </Text>
                <Text
                    category='p1'>{onFirst ? 'ON' : 'OFF'}</Text>
            </View>
        )
    else
        return <></>
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 6
    },
    title: {
        fontWeight: 'bold',
        marginRight: 8
    }
});

export default CycleOrderView;