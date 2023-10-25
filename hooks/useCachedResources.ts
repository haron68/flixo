import { useEffect, useState } from 'react'
import { DatabaseService, SETTINGS_KEY } from '../services/DatabaseService'
import { loadAsync } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false)
  const [settings, setSettings] = useState({})

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync()

        // Load fonts
        await loadAsync({
          'Poppins-Black': require('@assets/fonts/Poppins-Black.ttf'),
          'Poppins-BlackItalic': require('@assets/fonts/Poppins-BlackItalic.ttf'),
          'Poppins-Bold': require('@assets/fonts/Poppins-Bold.ttf'),
          'Poppins-BoldItalic': require('@assets/fonts/Poppins-BoldItalic.ttf'),
          'Poppins-ExtraBold': require('@assets/fonts/Poppins-ExtraBold.ttf'),
          'Poppins-ExtraBoldItalic': require('@assets/fonts/Poppins-ExtraBoldItalic.ttf'),
          'Poppins-ExtraLight': require('@assets/fonts/Poppins-ExtraLight.ttf'),
          'Poppins-ExtraLightItalic': require('@assets/fonts/Poppins-ExtraLightItalic.ttf'),
          'Poppins-Italic': require('@assets/fonts/Poppins-Italic.ttf'),
          'Poppins-Light': require('@assets/fonts/Poppins-Light.ttf'),
          'Poppins-LightItalic': require('@assets/fonts/Poppins-LightItalic.ttf'),
          'Poppins-Medium': require('@assets/fonts/Poppins-Medium.ttf'),
          'Poppins-MediumItalic': require('@assets/fonts/Poppins-MediumItalic.ttf'),
          'Poppins-Regular': require('@assets/fonts/Poppins-Regular.ttf'),
          'Poppins-SemiBold': require('@assets/fonts/Poppins-SemiBold.ttf'),
          'Poppins-SemiBoldItalic': require('@assets/fonts/Poppins-SemiBoldItalic.ttf'),
          'Poppins-Thin': require('@assets/fonts/Poppins-Thin.ttf'),
          'Poppins-ThinItalic': require('@assets/fonts/Poppins-ThinItalic.ttf'),
        })

        // load app settings to preload state
        await DatabaseService.get(SETTINGS_KEY).then((res) => {
          if (res) {
            setSettings(JSON.parse(res))
          }
        })
      } catch (e) {
        console.error(e)
      } finally {
        setLoadingComplete(true)
        SplashScreen.hideAsync()
      }
    }

    loadResourcesAndDataAsync()
  }, [])

  return [isLoadingComplete, settings]
}
