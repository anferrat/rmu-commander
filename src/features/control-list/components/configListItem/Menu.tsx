import { Button, MenuItem, OverflowMenu } from '@ui-kitten/components';
import React, { useCallback, useState } from 'react'
import { deleteIcon, editIcon, moreIcon } from '../../../../components/Icons';

interface MenuProps {
    configId: number,
    index: number,
    onEdit: (configId: number) => void
    onDelete: (configId: number, index: number) => void
}

function Menu({ index, configId, onEdit, onDelete }: MenuProps): React.JSX.Element {
    const [visible, setVisible] = useState(false)

    const showMenu = useCallback(() => { setVisible(true) }, [])
    const hideMenu = useCallback(() => { setVisible(false) }, [])

    const onEditHandler = useCallback(() => {
        onEdit(configId)
        hideMenu()
    }, [configId])

    const onDeleteHandler = useCallback(() => {
        onDelete(configId, index)
        hideMenu()
    }, [index, configId])

    const renderToggleButton = (): React.JSX.Element => (
        <Button
            size='small'
            status='basic'
            appearance='ghost'
            accessoryLeft={moreIcon}
            onPress={showMenu} />
    )

    return (
        <OverflowMenu
            anchor={renderToggleButton}
            visible={visible}
            onBackdropPress={hideMenu}>
            <MenuItem
                title={'Edit'}
                onPress={onEditHandler}
                accessoryLeft={editIcon} />
            <MenuItem
                title={'Delete'}
                onPress={onDeleteHandler}
                accessoryLeft={deleteIcon} />
        </OverflowMenu>
    );
}


export default React.memo(Menu);