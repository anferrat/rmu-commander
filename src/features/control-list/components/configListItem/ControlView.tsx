import React from 'react'
import { View, StyleSheet } from 'react-native'
import ControlButton from './ControlButton';
import { ControlButtons, SiteStatus } from '../../../../constants/constants';
import AwaitCommandControlBarView from './AwaitCommandControlBarView';

interface ControlViewProps {
    status: SiteStatus | null
    onInterrupt: () => unknown
    onShutOff: () => unknown
    onTurnOn: () => unknown,
    updating: boolean
    siteId: string
    companyId: string,
    autoUpdate: boolean
    loading: boolean
}

function ControlView({ status, onInterrupt, onShutOff, onTurnOn, updating, siteId, companyId, autoUpdate, loading }: ControlViewProps): React.JSX.Element {
    switch (status) {
        case SiteStatus.ON:
            return (
                <View
                    style={styles.container} >
                    <ControlButton
                        disabled={loading}
                        controlButton={ControlButtons.INTERRUPT}
                        onPress={onInterrupt}
                    />
                    <ControlButton
                        disabled={loading}
                        controlButton={ControlButtons.SHUT_OFF}
                        onPress={onShutOff}
                    />
                </View>
            )
        case SiteStatus.OFF:
            return (
                <View
                    style={styles.container} >
                    <ControlButton
                        disabled={loading}
                        controlButton={ControlButtons.TURN_ON}
                        onPress={onTurnOn}
                    />
                </View>
            )
        case SiteStatus.INT:
            return (
                <View
                    style={styles.container} >
                    <ControlButton
                        disabled={loading}
                        controlButton={ControlButtons.TURN_ON}
                        onPress={onTurnOn}
                    />
                    <ControlButton
                        disabled={loading}
                        controlButton={ControlButtons.SHUT_OFF}
                        onPress={onShutOff}
                    />
                </View>
            )
        case SiteStatus.AWT:
            return <AwaitCommandControlBarView
                autoUpdate={autoUpdate}
                siteId={siteId}
                companyId={companyId}
                updating={updating} />
        default:
            return <></>
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row'
    }
});

export default ControlView;