import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import { NavBarButton } from '@components/Buttons'
import { Text } from '@components/Texts'
import { View } from '@components/Views'
import useColorScheme from '@hooks/useColorScheme'
import DriverLicenseFlipAnimation from '@assets/animations/driver-license-flip.json'
import { baseStyles, MAX_WIDTH } from '@assets/BaseStyles'
import Theme from '@assets/Theme'
import {
  NavigationProp,
  StackActions,
} from '@react-navigation/native'
import { Block } from 'galio-framework'
import { Setting2 } from 'iconsax-react-native'
import LottieView from 'lottie-react-native'
import { useSelector } from 'react-redux'
import { RootState } from '@store/store'
import { getMoviesList } from '../services/RestService'

type Props = {
  navigation: NavigationProp<any>
}

const HomeScreen = ({ navigation }: Props) => {
  const colorScheme = useColorScheme()
  const [isLoading, setLoading] = useState(true)

  const hasSeenIntro: boolean | undefined = useSelector((state: RootState) => state.settings.hasSeenIntro)

  useEffect(() => {
    if (!hasSeenIntro) {
      navigation.dispatch(StackActions.push('Intro'))
    }

    navigation.setOptions({
      headerRight: () => (
        <NavBarButton
          colorScheme={colorScheme}
          icon={
            <Setting2
              color={Theme.COLORS.WHITE}
              size={Theme.SIZES.TAB_BAR_ICON_SIZE}
              variant='Bold'
            />
          }
          onPress={() => navigation.dispatch(StackActions.push('Settings'))}
          style={baseStyles.actionButton}
        />
      ),
    })
  }, [])

  useEffect(() => {
    getMoviesList()
      .then((res) => console.log('res -> ', res.data))
      .catch((err) => console.error('err -> ', err))
      .finally(() => setLoading(false))
  }, [])

  if (isLoading) {
    return (
      <View style={[baseStyles.container, baseStyles.centeredContainer]}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <View style={[baseStyles.container, baseStyles.centeredContainer]}>
      <Block style={{ height: 175, width: MAX_WIDTH }}>
        <LottieView
          source={DriverLicenseFlipAnimation}
          autoPlay={true}
          loop={true}
          resizeMode='cover'
          speed={0.4}
        />
      </Block>
      <Text
        style={[baseStyles.centeredText, { marginBottom: Theme.SIZES.BASE }]}>
        Your data is secure and not transmitted over the internet. It is safely
        stored on your device only.
      </Text>
      {/*<Button*/}
      {/*  icon='id-card'*/}
      {/*  iconFamily='font-awesome'*/}
      {/*  size='large'*/}
      {/*  onPress={scanDocuments}>*/}
      {/*  Add an ID*/}
      {/*</Button>*/}
    </View>
  )
}

const styles = StyleSheet.create<any>({
  infoContainer: {
    ...baseStyles.borderBottomLine,
    paddingVertical: Theme.SIZES.BASE,
  },
  infoHeader: {
    fontWeight: 'bold',
  },
})

export default HomeScreen
