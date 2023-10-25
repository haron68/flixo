import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator, ScrollView,
  StyleSheet,
} from 'react-native'
import { NavBarButton } from '@components/Buttons'
import { Text } from '@components/Texts'
import { View } from '@components/Views'
import useColorScheme from '@hooks/useColorScheme'
import { baseStyles } from '@assets/BaseStyles'
import Theme from '@assets/Theme'
import {
  NavigationProp,
  StackActions,
} from '@react-navigation/native'
import { Setting2 } from 'iconsax-react-native'
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
    <>
      <ScrollView contentContainerStyle={baseStyles.container}>
        <Text>ajd;fklaj;lsdkfjal;dkjf;aklsdf;kljasdf</Text>
      </ScrollView>
    </>
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
