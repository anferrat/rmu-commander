import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, CheckBox, Input, Layout, Text } from '@ui-kitten/components'
import { login } from '../../app/controllers/controller';
import { useLoginScreen } from './hooks/useLoginScreen';


interface LoginProps {
    // Define your props here
}


function Login({ }: LoginProps): React.JSX.Element {

    const {
        username,
        password,
        autoLogin,
        savePassword,
        loading,
        loggingIn,
        onChangeUsername,
        onChangePassword,
        onChangeAutoLogin,
        onChangeSavePassword,
        loginHandler
    } = useLoginScreen()
    return (
        <Layout style={styles.container}>
            <Text
                style={styles.title}
                category='h2'>
                RMU commander
            </Text>
            <Input
                disabled={loggingIn}
                style={styles.input}
                value={username}
                onChangeText={onChangeUsername}
                label="Username or e-mail"
            />
            <Input
                disabled={loggingIn}
                style={styles.input}
                value={password}
                onChangeText={onChangePassword}
                label="Password"
                secureTextEntry={true}
            />
            <CheckBox
                disabled={loggingIn || autoLogin}
                checked={savePassword}
                onChange={onChangeSavePassword}
                style={styles.checkbox}>
                Save password
            </CheckBox>
            <CheckBox
                disabled={loggingIn}
                onChange={onChangeAutoLogin}
                checked={autoLogin}
                style={styles.checkbox}>
                Auto-login
            </CheckBox>
            <Button
                onPress={loginHandler}
                style={styles.button}>
                Login
            </Button>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 12
    },
    title: {
        paddingBottom: 24
    },
    input: {
        paddingBottom: 12
    },
    button: {
        marginTop: 24
    },
    checkbox: {
        marginVertical: 6
    }
});

export default Login;