import React from 'react'
import { Select as SelectField, SelectItem, IndexPath, Text, SelectProps as SelectFieldProps } from '@ui-kitten/components'
import { StyleProp, StyleSheetProperties, ViewStyle } from 'react-native'

interface SelectProps {
    placeholder: string | null,
    onSelect: (index: number | null) => void
    selectedIndex: number | null
    items: Item[]
    label: string,
    style: StyleProp<ViewStyle>
}

type Item = {
    id: string,
    name: string
}

type PlaceholderTextProp = {
    placeholder: string | null
}

const PlaceholderText = ({ placeholder }: PlaceholderTextProp) => {
    return <Text appearance='hint'>{placeholder !== null ? placeholder : 'Error'}</Text>
}

const getSelectIndex = (selectedIndex: number | null) => selectedIndex !== null ? new IndexPath(selectedIndex, 1) : new IndexPath(0)

const getSelectValue = (selectedIndex: number | null, items: Item[], placeholder: string | null) =>
    selectedIndex === null && placeholder !== null ? <PlaceholderText placeholder={placeholder} /> :
        (placeholder === null && selectedIndex === null ? 'Loading' :
            (items[selectedIndex!]?.name ?? 'Loading'))


function Select({ placeholder, onSelect, selectedIndex, items, label, style }: SelectProps): React.JSX.Element {

    const onSelectHandler = React.useCallback((index: any) => {
        onSelect(!(index.section) ? null : index.row)
    }, [onSelect])

    const placeholderComponent = React.useMemo(() => <SelectItem title={<PlaceholderText placeholder={placeholder} />} />, [placeholder])

    return (
        <SelectField
            style={style}
            multiSelect={false}
            label={label}
            value={getSelectValue(selectedIndex, items, placeholder)}
            selectedIndex={getSelectIndex(selectedIndex)}
            onSelect={onSelectHandler}>
            {placeholder !== null ? placeholderComponent : <React.Fragment />}
            <>
                {
                    items?.map((item: Item) => <SelectItem
                        key={item.id}
                        title={item.name} />)
                }
            </>
        </SelectField>
    )
}


export default React.memo(Select)