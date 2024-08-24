import React, { useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import { TimeSelectionOptions } from '../../../constants/constants';
import { Icon, ListItem } from '@ui-kitten/components';
import { TimeSelectionOptionLabels } from '../../../constants/labels';
import { TimeSelectionOptionIconNames } from '../../../constants/icons';
import { TimeFrame } from '../../../app/entities/corview.cloud/TimeFrame';
import { getEndTime, isTimeDescriptionVisible } from '../helpers/functions';

interface TimeSelectionListItemProps {
    timeFrame: TimeFrame,
    onSelect: (startTime: number, endTime: number) => void
}

function TimeSelectionListItem({ timeFrame, onSelect }: TimeSelectionListItemProps): React.JSX.Element {
    const accessory = (props: any) => <Icon {...props} name={TimeSelectionOptionIconNames[timeFrame.timeSelectionOption]} />
    const onPress = () => onSelect(timeFrame.startDate, timeFrame.endDate)
    const descriptionVisible = isTimeDescriptionVisible(timeFrame.timeSelectionOption)
    return (
        <ListItem
            style={styles.container}
            title={TimeSelectionOptionLabels[timeFrame.timeSelectionOption]}
            accessoryLeft={accessory}
            onPress={onPress}
            description={descriptionVisible ? `Until ${getEndTime(timeFrame.startDate, timeFrame.endDate)}` : undefined} />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 55,
        justifyContent: 'center',
    }
});

export default TimeSelectionListItem;