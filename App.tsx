import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider as ReduxProvider } from 'react-redux'
import Navigation from '@navigation/index'
import { reducer, store } from '@store/store'
import useCachedResources from '@hooks/useCachedResources'
import Theme from '@assets/Theme'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { PortalProvider } from '@gorhom/portal'
import { configureStore } from '@reduxjs/toolkit'
import { StatusBar } from 'expo-status-bar'
import { GalioProvider } from 'galio-framework'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function App() {
  const [isLoadingComplete, settings] = useCachedResources()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <GestureHandlerRootView style={{flex: 1}}>
        <ReduxProvider
          store={store}>
          <ActionSheetProvider>
            <GalioProvider theme={Theme}>
              <BottomSheetModalProvider>
                <SafeAreaProvider>
                  <StatusBar
                    translucent={true}
                    backgroundColor='transparent'
                    barStyle='default'
                  />
                  <PortalProvider>
                    <Navigation />
                  </PortalProvider>
                </SafeAreaProvider>
              </BottomSheetModalProvider>
            </GalioProvider>
          </ActionSheetProvider>
        </ReduxProvider>
      </GestureHandlerRootView>
    )
  }
}
