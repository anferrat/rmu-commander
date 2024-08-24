import { Text } from '@ui-kitten/components';
import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { useUpdateControl } from '../../hooks/useUpdateControl';

interface AwaitCommandControlBarViewProps {
    updating: boolean
    siteId: string
    companyId: string
    autoUpdate: boolean
}

function AwaitCommandControlBarView({ updating, siteId, companyId, autoUpdate }: AwaitCommandControlBarViewProps): React.JSX.Element {
    const nextUpdateTime: number = useUpdateControl({ siteId, companyId })
    if (nextUpdateTime === -1 && autoUpdate)
        return <></>
    else
        return (
            <View
                style={styles.container}>
                <ActivityIndicator
                    style={styles.indicator}
                    size='small' />
                <Text
                    appearance='hint'
                    category='s2'>
                    {updating ? 'Updating' : (nextUpdateTime === -1 && !autoUpdate ? 'Press refresh to see the command updates.' : `Awaiting command completion. Next update in ${nextUpdateTime} seconds`)}
                </Text>
            </View>
        )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    indicator: {
        marginRight: 12
    }
});

export default AwaitCommandControlBarView