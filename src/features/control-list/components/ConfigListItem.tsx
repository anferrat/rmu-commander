import React, { useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import { ControlButtons } from '../../../constants/constants'
import Header from './configListItem/Header'
import ControlButton from './configListItem/ControlButton'
import CycleView from './configListItem/CycleView'
import StatusView from './configListItem/StatusView'
import ControlView from './configListItem/ControlView'
import { Layout } from '@ui-kitten/components'
import CycleOrderView from './configListItem/CycleOrderView'
import ItemLoadingView from './ItemLoadingView'
import { useConfigListItem } from '../hooks/useConfigListItem'

interface ConfigListItemProps {
    userId: string | null,
    configId: number,
    configName: string,
    configOn: number
    configOff: number
    siteId: string,
    companyId: string,
    groupId: string | null,
    index: number,
    note: string
    removeConfig: (configId: number, index: number, siteId: string, companyId: string) => void
    onEdit: (configId: number) => void
}

function ConfigListItem({ siteId, companyId, configName, configOn, configOff, configId, index, userId, note, removeConfig, onEdit }: ConfigListItemProps): React.JSX.Element {
    const {
        loading,
        on,
        off,
        siteName,
        groupName,
        onFirst,
        doneMessage,
        connected,
        updating,
        status,
        autoUpdate,
        onConnect,
        onInterrupt,
        onTurnOn,
        onShutOff,
    } = useConfigListItem({ siteId, companyId, configOn, configOff, userId, note })

    const onDelete = useCallback((configId: number, index: number) =>
        removeConfig(configId, index, siteId, companyId), [siteId, companyId])
    return (
        <Layout
            level='2'
            style={styles.container}>

            <Header
                connected={status !== null}
                configName={configName}
                siteName={siteName}
                groupName={groupName}
                onDelete={onDelete}
                onEdit={onEdit}
                index={index}
                configId={configId} />
            <View style={styles.body}>
                <View
                    style={styles.data}>
                    <CycleView
                        cycle={true}
                        value={on} />
                    <CycleView
                        cycle={false}
                        value={off} />
                    <CycleOrderView
                        onFirst={onFirst} />
                </View>
                <View
                    style={styles.compartment}>
                    <ControlButton
                        disabled={loading}
                        controlButton={!connected ? ControlButtons.CONNECT : ControlButtons.REFRESH}
                        onPress={onConnect} />
                </View>
            </View>
            <StatusView
                status={status}
                doneMessage={doneMessage}
                updating={updating} />
            <ControlView
                loading={loading}
                status={status}
                updating={updating}
                autoUpdate={autoUpdate}
                siteId={siteId}
                companyId={companyId}
                onInterrupt={onInterrupt}
                onShutOff={onShutOff}
                onTurnOn={onTurnOn} />
            <ItemLoadingView loading={loading} />
        </Layout>

    )
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        marginHorizontal: 6,
        borderRadius: 10,
        elevation: 5,
        marginBottom: 12
    },
    body: {
        flexDirection: 'row'
    },
    compartment: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    data: {
        flex: 1,
        justifyContent: 'flex-start',
    }
});

export default ConfigListItem;