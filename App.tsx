import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { install } from 'react-native-quick-crypto';
import { configureStore } from '@reduxjs/toolkit'
import global from './src/stores/global';
import { IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
install()

const store = configureStore({
  reducer: {
    global: global
  }
})

function App(): React.JSX.Element {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.dark}>
        <Provider
          store={store}>
          <StatusBar
            barStyle={'light-content'}
            translucent={true}
            backgroundColor={'transparent'} />
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </Provider>
      </ApplicationProvider>
    </>
  )
}

export default App;
