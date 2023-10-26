import { ColorSchemeName, Platform } from 'react-native'
import { BackButton } from '@components/Buttons'
import HomeScreen from '@screens/HomeScreen'
import PhotoSlideShowModalScreen from '@screens/PhotoSlideShowModalScreen'
import SettingsScreen from '@screens/SettingsScreen'
import useColorScheme from '@hooks/useColorScheme'
import Theme from '@assets/Theme'
import {
  NavigationContainer,
  StackActions,
  useNavigation,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import IntroModalScreen from '@screens/IntroModalScreen'
import MovieDetailScreen from '@screens/MovieDetailScreen'

const headerLargeTitleOptions = (colorScheme: ColorSchemeName) => ({
  headerLargeTitle: true,
  headerLargeTitleStyle: {
    fontFamily: 'Poppins-Bold',
    color: colorScheme == 'dark' ? Theme.COLORS.WHITE : Theme.COLORS.DARK,
  },
  headerTitleStyle: {
    fontFamily: 'Poppins-Bold',
    color: colorScheme == 'dark' ? Theme.COLORS.WHITE : Theme.COLORS.DARK,
  },
  headerTitleAlign: 'center',
  headerShadowVisible: false,
  headerLargeTitleShadowVisible: false,
  headerTransparent: Platform.select({ios: true, android: false}),
  headerBlurEffect: 'light',
  headerStyle: {
    backgroundColor: colorScheme == 'dark' ? Theme.COLORS.BLACK : null,
  },
  headerBackVisible: false,
})

const headerTitleOptions = (colorScheme: ColorSchemeName) => ({
  headerTitleStyle: {
    fontFamily: 'Poppins-Bold',
    color: colorScheme == 'dark' ? Theme.COLORS.WHITE : Theme.COLORS.DARK,
  },
  headerTitleAlign: 'center',
  headerShadowVisible: false,
  headerBackVisible: false,
  headerStyle: {
    backgroundColor: colorScheme == 'dark' ? Theme.COLORS.BLACK : null,
  },
})

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  )
}

const RootStack = createNativeStackNavigator()

const RootNavigator = () => {
  const colorScheme = useColorScheme()
  const navigation = useNavigation()

  return (
    <RootStack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <RootStack.Screen
        name='Home'
        component={HomeScreen}
        options={{
          title: 'Flixo',
          headerTitle: 'Flixo',
          ...headerLargeTitleOptions(colorScheme),
          headerLargeTitleStyle: {
            fontFamily: 'Poppins-Bold',
            color: Theme.COLORS.GOLD,
          },
          headerTitleStyle: {
            fontFamily: 'Poppins-Bold',
            color: Theme.COLORS.GOLD,
          },
        }}
      />
      <RootStack.Screen
        name='MovieDetail'
        component={MovieDetailScreen}
        options={{
          title: '',
          headerTitle: '',
          ...headerLargeTitleOptions(colorScheme),
          headerLeft: () => (
            <BackButton
              colorScheme={colorScheme}
              onPress={() => navigation.dispatch(StackActions.pop())}
            />
          ),
        }}
      />
      <RootStack.Screen
        name='Settings'
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerTitle: 'Settings',
          ...headerLargeTitleOptions(colorScheme),
          headerLeft: () => (
            <BackButton
              colorScheme={colorScheme}
              onPress={() => navigation.dispatch(StackActions.pop())}
            />
          ),
        }}
      />
      <RootStack.Screen
        name='PhotoSlideShow'
        component={PhotoSlideShowModalScreen}
        options={{
          headerShown: false,
          presentation: 'fullScreenModal',
          animation: 'fade',
          contentStyle: {
            backgroundColor: Theme.COLORS.BLACK,
          },
          ...headerTitleOptions('light'),
        }}
      />
      <RootStack.Screen
        name='Intro'
        component={IntroModalScreen}
        options={{
          presentation: 'modal',
          title: 'Welcome',
          headerTitle: 'Welcome',
          ...headerTitleOptions(colorScheme)
        }}
      />
    </RootStack.Navigator>
  )
}

export default Navigation
