import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SendCommandTypes, SiteStatus } from '../../../../constants/constants';
import { Text } from '@ui-kitten/components';
import { SiteStatusStatuses } from '../../../../constants/colors';
import { SendCommanTypeLabels, SiteStatusLabels } from '../../../../constants/labels';

interface StatusViewProps {
    status: SiteStatus | null,
    doneMessage: string
    updating: boolean
    commandType: SendCommandTypes | null
}

function StatusView({ status, doneMessage, updating, commandType }: StatusViewProps): React.JSX.Element {
    if (status === null)
        return <></>
    else return (
        <View
            style={styles.container}>
            <View style={styles.statusContainer}>
                <Text
                    category='s2'
                    style={styles.title}>
                    Status:
                </Text>
                <Text
                    status={SiteStatusStatuses[status]}>
                    {SiteStatusLabels[status]}
                </Text>
                {
                    commandType !== null && status === SiteStatus.AWT ?
                        <Text
                            style={styles.desc}
                            appearance='hint'
                            category='s2'>
                            ({SendCommanTypeLabels[commandType]})
                        </Text> : null
                }
            </View>
            {doneMessage !== '' && !updating ?
                <View
                    style={styles.messageView}>
                    <Text
                        category='s2'
                        style={styles.title}>
                        Last command status:
                    </Text>
                    <Text
                        numberOfLines={1}
                        appearance='hint'
                        category='s2'>
                        {doneMessage!}
                    </Text>
                </View> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    statusContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 6
    },
    title: {
        marginRight: 6,
        fontWeight: 'bold'
    },
    messageView: {
        flexDirection: 'row'
    },
    container: {
        marginBottom: 12
    },
    desc: {
        marginLeft: 6
    }
});

export default StatusView;