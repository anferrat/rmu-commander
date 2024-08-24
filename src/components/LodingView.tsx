import { Layout, useTheme } from '@ui-kitten/components';
import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'


function LoadingView(): React.JSX.Element {
    const theme = useTheme()
    return (
        <Layout
            style={styles.container}>
            <ActivityIndicator
                size={'large'}
                color={theme['color-basic-400']}
            />
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default LoadingView;