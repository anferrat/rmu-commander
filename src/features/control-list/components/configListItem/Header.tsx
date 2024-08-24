import { Text } from '@ui-kitten/components';
import React from 'react'
import { View, StyleSheet } from 'react-native'
import Menu from './Menu';

interface HeaderProps {
    configName: string,
    siteName: string | null
    groupName: string | null,
    index: number,
    configId: number,
    connected: boolean
    onDelete: (configId: number, index: number) => void
    onEdit: (configId: number) => void
}

function Header({ configName, siteName, groupName, configId, onDelete, onEdit, index, connected }: HeaderProps): React.JSX.Element {
    return (
        <View
            style={styles.container}>
            <View style={styles.topLine}>
                <Text category='h5'>
                    {configName}
                </Text>
                <Menu
                    configId={configId}
                    index={index}
                    onDelete={onDelete}
                    onEdit={onEdit} />
            </View>
            {!connected || siteName === null || groupName === null ?
                null :
                <Text
                    appearance='hint'
                    category='s1'>
                    {siteName} | {groupName}
                </Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginBottom: 12,
    },
    topLine: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default React.memo(Header);