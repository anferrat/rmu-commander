import { Button, Layout, Popover, Text } from '@ui-kitten/components';
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTopBar } from './hooks/useTopBar';
import { activityIcon, logoutIcon, personIcon } from '../../components/Icons';
import LoadingView from '../../components/LodingView';

interface TopBarComponentProps {
    // Define your props here
}

function TopBarComponent({ }: TopBarComponentProps): React.JSX.Element {
    const { visible, hidePopover, showPopover, user, logoutHandler, isLogginOut } = useTopBar()

    const renderToggleButton = () => (
        <Button
            accessoryLeft={personIcon}
            appearance='ghost'
            status='control'
            onPress={showPopover} />
    )

    return (
        <Popover
            visible={visible}
            onBackdropPress={hidePopover}
            anchor={renderToggleButton}>
            {user === null ?
                <LoadingView /> :
                <Layout style={styles.container}>
                    <Text appearance='hint' category='label'>User</Text>
                    <Text>{user!}</Text>
                    <Button
                        disabled={isLogginOut}
                        style={styles.button}
                        onPress={logoutHandler}
                        appearance='ghost'
                        status='danger'
                        accessoryRight={isLogginOut ? activityIcon : logoutIcon}>Log out</Button>
                </Layout>
            }

        </Popover>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 6,
        paddingTop: 6,
        minWidth: 150
    },
    button: {
        marginTop: 12,
        marginHorizontal: -6
    }
});

export default TopBarComponent;