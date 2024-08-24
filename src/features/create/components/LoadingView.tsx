import { useTheme } from '@ui-kitten/components';
import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'

interface LoadingViewProps {
    loading: boolean
}

function LoadingView({ loading }: LoadingViewProps): React.JSX.Element {
    const theme = useTheme()
    if (loading)
        return (
            <View style={styles.container} >
                <ActivityIndicator color={theme['color-control-active']} />
            </View>
        )
    else
        return <>
        </>
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    }
});

export default LoadingView;