import { Icon, ListItem } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet } from 'react-native'

interface SiteSelectItemProps {
    title: string
    index: number
    onPress: (selectedIndex: number) => void,
    selected: boolean
}

const accessoryOff = (props: any) => <Icon {...props} name='radio-button-off' />

const accessoryOn = (props: any) => <Icon {...props} name='checkmark-circle-2' />

function SiteSelectItem({ title, index, onPress, selected }: SiteSelectItemProps): React.JSX.Element {

    const onPressHandler = () => onPress(index)

    return (
        <ListItem
            onPress={onPressHandler}
            style={styles.item}
            accessoryLeft={selected ? accessoryOn : accessoryOff}
            title={title} />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    item: {
        flex: 1
    }
});

export default React.memo(SiteSelectItem);