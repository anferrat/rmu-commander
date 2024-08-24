import { Layout, Modal, Text } from '@ui-kitten/components';
import React from 'react'
import { StyleSheet } from 'react-native'
import TimeSelectionListItem from './TimeSelectionListItem';
import { useTimeSelect } from '../hooks/useTimeSelect';
import LoadingView from '../../../components/LodingView';

interface TimeSelectModalProps {
    // Define your props here
}

function TimeSelectModal({ }: TimeSelectModalProps): React.JSX.Element {

    const { visible, timeFrames, loading, onSelect, reset } = useTimeSelect()
    return (
        <Modal
            style={styles.modal}
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={reset}>
            <Layout
                style={styles.container}>
                <Text
                    category='h6'
                    appearance='hint'
                    style={styles.title}>
                    Interrupting duration:
                </Text>
                {timeFrames.map((timeFrame) =>
                    <TimeSelectionListItem
                        key={timeFrame.timeSelectionOption}
                        timeFrame={timeFrame}
                        onSelect={onSelect}
                    />

                )}
                {loading ? <LoadingView /> : null}
            </Layout>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        width: '80%',
        justifyContent: 'center',
    },
    container: {
        borderRadius: 10,
        overflow: 'hidden',
        minHeight: 200
    },
    backdrop: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    title: {
        marginHorizontal: 12,
        marginVertical: 12
    }
})

export default TimeSelectModal