import React, { FC, useEffect, useRef, useState } from 'react'
import { View } from '@components/Views'
import { baseStyles } from '@assets/BaseStyles'
import { NavigationProp, StackActions } from '@react-navigation/native'
import { FlatList, I18nManager, NativeScrollEvent, Platform, StyleSheet, Text } from 'react-native'
import Layout from '@constants/Layout'
import LottieView from 'lottie-react-native'
import PaginationButton from '@components/Buttons/PaginationButton'
import Theme from '@assets/Theme'
import Scene1Animation from '@assets/animations/scene1.json'
import Scene2Animation from '@assets/animations/scene2.json'
import Scene3Animation from '@assets/animations/scene3.json'
import Colors from '@constants/Colors'
import useColorScheme from '@hooks/useColorScheme'
import { useDispatch } from 'react-redux'
import { settingsActions } from '@store/settingsSlice'

type AppIntroSliderItem = {
  title: string
  subTitle: string
  icon: any
}

type Props = {
  navigation: NavigationProp<any>
}

const IntroModalScreen: FC<Props> = ({ navigation }) => {
  const colorScheme = useColorScheme()
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const isAndroidRTL = I18nManager.isRTL && Platform.OS === 'android'
  const flatListRef = useRef<FlatList>(null)

  const dispatch = useDispatch()

  // Index that works across Android's weird rtl bugs
  const rtlSafeIndex = (i: number) =>
    isAndroidRTL ? slides.length - 1 - i : i;

  const handleMomentumScrollEnd = (e: { nativeEvent: NativeScrollEvent }) => {
    const offset = e.nativeEvent.contentOffset.x
    // Touching very very quickly and continuous brings about
    // a variation close to - but not quite - the width.
    // That's why we round the number.
    // Also, Android phones and their weird numbers
    const newIndex = rtlSafeIndex(Math.round(offset / Layout.window.width))

    if (newIndex === activeIndex) {
      // No page change, don't do anything
      return
    }
    setActiveIndex(newIndex)
  }

  useEffect(() => {
    dispatch(settingsActions.setHasSeenIntro(true))
  }, [])


  const styles: any = StyleSheet.create({
    pageContainer: {
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    },
    pageDescription: {
      marginTop: Theme.SIZES.BASE,
      color: Colors[colorScheme].text,
      textAlign: 'center',
    },
  });

  const slides: AppIntroSliderItem[] = [
    {
      title: 'Welcome to Flixo',
      subTitle:
        'Discover movies',
      icon: (
        <View style={[styles.pageContainer, { height: 150 }]}>
          <LottieView
            source={Scene1Animation}
            autoPlay={true}
            loop={true}
            speed={0.4}
            style={{
              height: 300
            }}
          />
        </View>
      ),
    },
    {
      title: 'Find new flicks',
      subTitle: 'Recommend and share your favorite movies',
      icon: (
        <View style={[styles.pageContainer, { height: 150 }]}>
          <LottieView
            source={Scene2Animation}
            autoPlay={true}
            loop={true}
            style={{
              height: 300
            }}
          />
        </View>
      ),
    },
    {
      title: 'More movies...',
      subTitle: 'Endless movies await you',
      icon: (
        <View style={[styles.pageContainer, { height: 150 }]}>
          <LottieView
            source={Scene3Animation}
            autoPlay={true}
            loop={true}
            style={{
              height: 300
            }}
          />
        </View>
      ),
    },
  ];

  return (
    <View style={[baseStyles.centeredContainer]}>
      <FlatList
        ref={flatListRef}
        pagingEnabled={true}
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={slides}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={({ item }) => (
          <View style={[baseStyles.pageContainer, baseStyles.container]}>
            {item.icon}
            <Text style={[baseStyles.thinTitleXL, styles.pageDescription]}>
              {item.title}
            </Text>
            <Text
              style={[
                baseStyles.thinTitle,
                styles.pageDescription
              ]}>
              {item.subTitle}
            </Text>
          </View>
        )}
        style={{
          maxHeight: 300,
        }}
      />
      <PaginationButton
        flatListRef={flatListRef}
        slides={slides}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        showContinueButton={true}
        onEndReached={() => navigation.dispatch(
          StackActions.pop()
        )}
      />
    </View>
  )
}

export default IntroModalScreen
