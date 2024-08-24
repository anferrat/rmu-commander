import { Button, Layout } from '@ui-kitten/components'
import React, { useCallback, useState } from 'react'
import { View, StyleSheet, Modal, FlatList, StatusBar } from 'react-native'
import Select from './Select'
import { useSiteSelection } from '../hooks/useSiteSelection'
import SiteSelectItem from './SiteSelectItem'
import { Site } from '../../../app/entities/corview.cloud/Site'
import LoadingView from './LoadingView'

interface SiteSelectionModalProps {
    onSelectSite: (siteId: string, groupId: string | null, companyId: string) => void
    hideModal: () => void
    visible: boolean
}

const items = [{
    id: '23232',
    name: 'First option'
},
{
    id: '2323222',
    name: 'Swcond option'
},
{
    id: 'ewew2',
    name: 'Third option'
}
]

function SiteSelectionModal({ onSelectSite, hideModal, visible }: SiteSelectionModalProps): React.JSX.Element {
    const {
        loading,
        companies,
        sites,
        groups,
        selectedSiteIndex,
        selectedGroupIndex,
        selectedCompanyIndex,
        setSelectedCompanyIndex,
        setSelectedGroupIndex,
        setSelectedSiteIndex,
        onSelectHandler

    } = useSiteSelection({ hideModal, onSelectSite, visible })

    const renderItem = useCallback(({ item, index }: { item: Site, index: number }) => <SiteSelectItem
        title={item.name}
        index={index}
        onPress={setSelectedSiteIndex}
        selected={selectedSiteIndex === index}
    />, [selectedSiteIndex])

    return (
        <Modal
            animationType='slide'
            visible={visible}
            onRequestClose={hideModal}>

            <Layout style={styles.modal}>

                <Select
                    style={styles.select}
                    label={'Company'}
                    items={companies}
                    selectedIndex={selectedCompanyIndex}
                    onSelect={setSelectedCompanyIndex}
                    placeholder={null} />
                <Select
                    style={styles.select}
                    label='Group'
                    items={groups}
                    selectedIndex={selectedGroupIndex}
                    onSelect={setSelectedGroupIndex}
                    placeholder={'Select group'} />
                <FlatList
                    data={sites}
                    renderItem={renderItem}
                    keyExtractor={item => item.id} />
                <Button
                    style={styles.button}
                    onPress={selectedSiteIndex === null ? hideModal : onSelectHandler}>
                    {selectedSiteIndex === null ? 'Close' : 'Confirm'}
                </Button>
            </Layout>
            <LoadingView loading={loading} />
        </Modal >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',

    },
    modal: {
        flex: 1,
        paddingHorizontal: 12,
        paddingTop: StatusBar.currentHeight
    },
    select: {
        marginVertical: 6,
    },
    button: {
        marginBottom: 12,
        marginTop: 6
    }
});

export default SiteSelectionModal;