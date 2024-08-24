import { Button, Input, Layout, Text } from '@ui-kitten/components';
import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import CycleInput from './components/CycleInput';
import { useCreateConfig } from './hooks/useCreateConfig';
import SiteSelectionModal from './components/SiteSelectionModal';
import SiteSelectView from './components/SiteSelectView';
import { activityIcon, plusIcon, saveIcon } from '../../components/Icons';
import LoadingView from './components/LoadingView';

interface CreateConfigProps {
    id: number | null
    goBack: () => void
}

function CreateConfig({ id, goBack }: CreateConfigProps): React.JSX.Element {
    const {
        name,
        on,
        off,
        defaultNote,
        nameValid,
        onValid,
        offValid,
        siteSelectVisible,
        site,
        saving,
        loading,
        isNew,
        onValidateName,
        onValidateDefaultNote,
        onChangeName,
        onChangeDefaultNote,
        onEditCycle,
        onValidateCycle,
        onSiteSelect,
        showSiteSelect,
        hideSiteSelect,
        resetSite,
        onCreateHandler,
        setName
    } = useCreateConfig({ id, goBack })
    return (
        <>

            <ScrollView contentContainerStyle={styles.scrollview}>
                <Layout
                    style={styles.container}>
                    <SiteSelectView
                        setName={setName}
                        showSiteSelect={showSiteSelect}
                        site={site}
                        resetSite={resetSite} />
                    <Input
                        value={name}
                        status={nameValid ? 'basic' : 'danger'}
                        onChangeText={onChangeName}
                        onEndEditing={onValidateName}
                        style={styles.name}
                        label={'Configuration name'}
                        maxLength={40}
                        caption={!nameValid ? 'Please enter valid name' : undefined} />
                    <View style={styles.cycles}>
                        <CycleInput
                            value={on}
                            style={styles.leftCycle}
                            valid={onValid}
                            onEditText={onEditCycle}
                            cycle={true}
                            onValidate={onValidateCycle}
                        />
                        <CycleInput
                            value={off}
                            style={styles.rightCycle}
                            valid={offValid}
                            onEditText={onEditCycle}
                            cycle={false}
                            onValidate={onValidateCycle}
                        />
                    </View>
                    <Input
                        value={defaultNote}
                        onChangeText={onChangeDefaultNote}
                        onEndEditing={onValidateDefaultNote}
                        style={styles.name}
                        label={'Default note'}
                        maxLength={40} />
                    <Button
                        disabled={saving}
                        accessoryLeft={saving ? activityIcon : (isNew ? plusIcon : saveIcon)}
                        style={styles.button}
                        onPress={onCreateHandler}>
                        {isNew ? 'Create configuration' : 'Update configuartion'}
                    </Button>
                    <SiteSelectionModal
                        onSelectSite={onSiteSelect}
                        visible={siteSelectVisible}
                        hideModal={hideSiteSelect}
                    />
                </Layout>
            </ScrollView >
            <LoadingView loading={loading} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    },
    cycles: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12
    },
    leftCycle: {
        flex: 1,
        marginRight: 12
    },
    rightCycle: {
        marginLeft: 12,
        flex: 1
    },
    name: {
        marginBottom: 12
    },
    scrollview: {
        flex: 1
    },
    button: {
        marginTop: 24
    }
});

export default CreateConfig;