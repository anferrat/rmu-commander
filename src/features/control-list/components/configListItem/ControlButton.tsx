import React from 'react'
import { ControlButtons } from '../../../../constants/constants';
import { Button, Icon } from '@ui-kitten/components';
import { ControlButtonIconNames } from '../../../../constants/icons';
import { ControlButtonStatuses } from '../../../../constants/colors';
import { ControlButtonLabels } from '../../../../constants/labels';

interface ControlButtonProps {
    controlButton: ControlButtons
    onPress: () => unknown
    disabled?: boolean
}

function ControlButton({ controlButton, onPress, disabled }: ControlButtonProps): React.JSX.Element {
    const accessory = (props: any) => <Icon {...props} name={ControlButtonIconNames[controlButton]} />

    return (
        <Button
            disabled={disabled}
            appearance='ghost'
            onPress={onPress}
            status={ControlButtonStatuses[controlButton]}
            accessoryLeft={accessory}>
            {ControlButtonLabels[controlButton]}
        </Button>
    )
}

export default React.memo(ControlButton);