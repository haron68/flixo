import * as React from 'react'
import {
  I18nManager,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import Layout from '@constants/Layout'

import { baseStyles } from '@assets/BaseStyles'
import { View } from '@components/Views'
import useColorScheme from '@hooks/useColorScheme'
import Colors from '@constants/Colors'
import { Button } from '@components/Buttons/Button'

type PaginationButtonProps = {
  slides: any[];
  flatListRef: any;
  activeIndex: number;
  setActiveIndex: (num: number) => void;
  disableSlideChange?: boolean;
  showContinueButton?: boolean;
  onEndReached?: Function
  style?: StyleSheet.NamedStyles<any>;
};

const PaginationButton = (props: PaginationButtonProps) => {
  const {
    slides,
    flatListRef,
    activeIndex,
    setActiveIndex,
    disableSlideChange = false,
    showContinueButton = false,
    onEndReached = undefined,
    style = {},
  } = props
  const isAndroidRTL = I18nManager.isRTL && Platform.OS === 'android'
  const colorScheme = useColorScheme()

  const goToSlide = (slideNum: number) => {
    setActiveIndex(slideNum)
    flatListRef.current?.scrollToOffset({
      offset: rtlSafeIndex(slideNum) * Layout.window.width,
    })
  }

  const handleOnContinue = () => {
    let nextIndex = activeIndex + 1
    if (nextIndex > slides.length - 1) {
      onEndReached?.()
      return
    }

    goToSlide(nextIndex)
  }

  // Index that works across Android's weird rtl bugs
  const rtlSafeIndex = (i: number) =>
    isAndroidRTL ? slides.length - 1 - i : i

  const styles = StyleSheet.create({
    activeDotStyle: {
      backgroundColor: Colors[colorScheme].text
    },
    dotStyle: baseStyles.dotStyle,
    dot: baseStyles.dot,
    ...style,
  })

  return (
    <View style={baseStyles.paginationContainer}>
      <SafeAreaView>
        <View
          style={[
            baseStyles.paginationDots,
            { flexDirection: isAndroidRTL ? 'row-reverse' : 'row' },
          ]}>
          {slides.length > 1 &&
            slides.map((_: any, i: number) => (
              <TouchableOpacity
                disabled={disableSlideChange}
                hitSlop={{ left: 15, right: 15, top: 15, bottom: 15 }}
                key={i}
                style={[
                  styles.dot,
                  rtlSafeIndex(i) === activeIndex
                    ? styles.activeDotStyle
                    : styles.dotStyle,
                ]}
                onPress={() => goToSlide(i)}
              />
            ))}
        </View>
        <Button
          icon='arrowright'
          iconFamily='antdesign'
          iconRight={true}
          size='small'
          onPress={handleOnContinue}
        >
          Continue
        </Button>
      </SafeAreaView>
    </View>
  )
}

export default PaginationButton
