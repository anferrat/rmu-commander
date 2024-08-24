import { Text } from '@ui-kitten/components';
import React from 'react'
import { View, StyleSheet } from 'react-native'

interface EmptyListItemProps {
    // Define your props here
}

function EmptyListItem({ }: EmptyListItemProps): React.JSX.Element {
    return (
        <View style={styles.container}>
            <Text appearance='hint' category='h6' style={styles.text}>
                No configurations found
            </Text>
            <Text appearance='hint' category='s2' style={styles.text}>
                Create configurations in order to send commands to RMU. Configuartions will be stored on the device and be only available for the current user.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 12,
    },
    text: {
        textAlignVertical: 'center',
        textAlign: 'center',
    }
});

export default EmptyListItem;