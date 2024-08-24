import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login';
import ControlList from '../screens/ControlList';
import CreateScreen from '../screens/Create';
import { RootStackParamList } from './types/RootStackParamList';
import { useApp } from '../hooks/useApp';
import LoadingView from '../components/LodingView';
import DevScreen from '../screens/Dev';
import { useTheme } from '@ui-kitten/components'
import TopBarComponent from '../features/topbar';


const Stack = createNativeStackNavigator<RootStackParamList>()

interface AppNavigatorProps {
    // Define your props here
}

function AppNavigator({ }: AppNavigatorProps): React.JSX.Element {
    const { isLoggedIn, isLoading } = useApp()
    const theme = useTheme()
    if (isLoading)
        return <LoadingView />
    else
        return <>

            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerShown: false,
                    headerStyle: { backgroundColor: theme['background-basic-color-2'] },
                    headerTintColor: theme['text-basic-color'],
                }}>
                {
                    isLoggedIn ? (
                        <>
                            <Stack.Screen
                                options={{
                                    headerShown: true,
                                    title: 'RMU commander',
                                    headerRight: TopBarComponent
                                }}
                                name='List'
                                component={ControlList} />
                            <Stack.Screen
                                name='Create'
                                options={{
                                    headerShown: true,
                                    title: 'Edit configuration'
                                }}
                                component={CreateScreen} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen
                                name='Login'
                                component={LoginScreen} />
                        </>)}
                {
                    __DEV__ ? (
                        <>
                            <Stack.Screen
                                name='Dev'
                                component={DevScreen} />
                        </>) :
                        null
                }
            </Stack.Navigator>
        </>
}


export default AppNavigator;