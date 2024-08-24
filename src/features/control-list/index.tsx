import { Button, Layout } from '@ui-kitten/components';
import React from 'react'
import { FlatList, ListRenderItem, StyleSheet } from 'react-native'
import { plusIcon } from '../../components/Icons';
import ConfigListItem from './components/ConfigListItem';
import { useConfigList } from './hooks/useConfigList';
import { Config } from '../../app/entities/Config';
import EmptyListItem from './components/EmptyListItem';
import TimeSelectModal from './components/TimeSelectModal';

interface ControlListProps {
    navigateToCreate: () => void
    navigateToEdit: (id: number) => void
}

function ControlList({ navigateToCreate, navigateToEdit }: ControlListProps): React.JSX.Element {
    const { configs, loading, userId, loadConfigs, removeConfig } = useConfigList()

    const renderItem: ListRenderItem<Config> = ({ item, index }) => (
        <ConfigListItem
            userId={userId}
            removeConfig={removeConfig}
            onEdit={navigateToEdit}
            siteId={item.siteId}
            groupId={item.groupId}
            companyId={item.companyId}
            configName={item.name}
            configOn={item.on}
            configOff={item.off}
            configId={item.id!}
            index={index}
            note={item.note} />
    )
    const keyExtractor = (item: Config) => {
        return item.siteId + item.companyId + item.timeModified
    }

    return (
        <Layout style={styles.container}>
            <FlatList
                contentContainerStyle={styles.flatlist}
                ListHeaderComponent={
                    <Button
                        style={styles.button}
                        appearance='ghost'
                        onPress={navigateToCreate}
                        accessoryLeft={plusIcon}>
                        Create new configuration
                    </Button>
                }
                ListEmptyComponent={EmptyListItem}
                refreshing={loading}
                onRefresh={loadConfigs}
                data={configs}
                renderItem={renderItem}
                keyExtractor={keyExtractor} />
            <TimeSelectModal />
        </Layout>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    flatlist: {
        flexGrow: 1,
    },
    button: {
        height: 60,
        marginBottom: 12
    }
});

export default ControlList;