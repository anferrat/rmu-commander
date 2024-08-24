import { Layout, useTheme } from '@ui-kitten/components';
import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'

type ItemLoadingViewProps = {
    loading: boolean
}


function ItemLoadingView({ loading }: ItemLoadingViewProps): React.JSX.Element {
    const theme = useTheme()
    if (loading)
        return (
            <Layout
                style={styles.container}>
                <ActivityIndicator
                    size={'large'}
                    color={theme['color-basic-400']} />
            </Layout>
        )
    else return <></>
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 10,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)'
    }
});

export default ItemLoadingView;