import { Input, Text } from '@ui-kitten/components';
import React, { useCallback } from 'react'
import { TextInputProps, StyleSheet } from 'react-native';

interface CycleInputProps extends TextInputProps {
    cycle: boolean
    valid: boolean
    onEditText: (cycle: boolean, text: string) => void
    onValidate: (cycle: boolean) => void
}

const accessory = () => <Text category='label' status='control'>ms</Text>

function CycleInput({ cycle, valid, style, onEditText, onValidate, value }: CycleInputProps): React.JSX.Element {

    const onChangeTextHandler = useCallback((text: string) => onEditText(cycle, text), [cycle])
    const onValidateHandler = useCallback(() => onValidate(cycle), [cycle, onValidate])

    return (
        <Input
            value={value}
            style={style}
            label={cycle ? 'On' : 'Off'}
            placeholder='100 - 59900'
            onChangeText={onChangeTextHandler}
            onEndEditing={onValidateHandler}
            status={valid ? 'basic' : 'danger'}
            accessoryRight={accessory}
            keyboardType='numeric'
            caption={!valid ?
                <Text category='s2' status='danger'>
                    Cycle must be between 100 and 59900
                </Text>
                : undefined}
        />
    );
}

export default React.memo(CycleInput);