import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { SiteType } from '../hooks/useCreateConfig';
import { Button, Text, useTheme } from '@ui-kitten/components';
import { closeIcon } from '../../../components/Icons';
import { useSiteStatus } from '../hooks/useSiteStatus';

interface SiteSelectViewProps {
    site: SiteType
    showSiteSelect: () => void,
    resetSite: () => void
    setName: React.Dispatch<React.SetStateAction<string>>
}

function SiteSelectView({ site, showSiteSelect, resetSite, setName }: SiteSelectViewProps): React.JSX.Element {
    const isSelected = site.siteId !== null && site.companyId !== null
    const { siteName, loading, } = useSiteStatus({ siteId: site.siteId, companyId: site.companyId, setName })
    const theme = useTheme()
    return (
        <View style={styles.siteSelect}>
            <Text
                category='label'
                appearance='hint'>
                Site
            </Text>
            <View
                style={styles.buttonWrapper}>{
                    loading ? <ActivityIndicator color={theme['color-primary-500']} /> : (
                        isSelected ?
                            <View style={styles.siteView}>
                                <Text
                                    style={styles.siteText}
                                    numberOfLines={1}
                                    ellipsizeMode='tail'>
                                    {siteName !== null ? siteName : 'Error'}
                                </Text>
                                <Button
                                    appearance='ghost'
                                    status='control'
                                    accessoryLeft={closeIcon}
                                    onPress={resetSite} />
                            </View> :
                            <Button
                                onPress={showSiteSelect}
                                appearance='outline'
                                style={styles.selectButton}>
                                Select site
                            </Button>
                    )}

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    siteSelect: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    selectButton: {
        maxWidth: 200,
        flex: 1
    },
    buttonWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    siteView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    siteText: {
        marginHorizontal: 12,
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center'
    }
});

export default SiteSelectView;