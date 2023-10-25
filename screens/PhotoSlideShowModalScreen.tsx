import React, { useEffect, useRef, useState } from 'react'
import {
  Image,
  ImageSourcePropType,
  Route,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'
import ImageZoom from 'react-native-image-pan-zoom'
import { initialWindowMetrics } from 'react-native-safe-area-context'
// @ts-ignore
import { Carousel } from 'react-native-snap-carousel'
import { NavBarButton } from '@components/Buttons'
import { Text } from '@components/Texts'
import { NavBar } from '@components/Views/NavBar'
import Layout from '@constants/Layout'
import useColorScheme from '@hooks/useColorScheme'
import { baseStyles } from '@assets/BaseStyles'
import Theme from '@assets/Theme'
import { askUserToLeaveReview } from '../services/RestService'
import { Feather } from '@expo/vector-icons'
import { NavigationProp, StackActions } from '@react-navigation/native'

type PhotoSlideShowModalScreenProps = {
  navigation: NavigationProp<any>
  route: Route
}

const ImageZoomItem = ({ source }: { source: ImageSourcePropType }) => {
  const scaleValue = useRef(1)

  return (
    <ImageZoom
      cropWidth={Layout.window.width}
      cropHeight={Layout.window.height}
      imageWidth={Layout.window.width}
      imageHeight={Layout.window.height}
      enableDoubleClickZoom={true}
      minScale={1}
      style={{
        width: Layout.window.width,
        height: Layout.window.height,
        minWidth: Layout.window.width,
      }}
      onStartShouldSetPanResponder={(e) =>
        e.nativeEvent.touches.length === 2 || scaleValue.current > 1
      }
      onMove={(data) => {
        scaleValue.current = data.scale
      }}>
      <View
        style={{ width: '100%', height: '100%' }}
        onStartShouldSetResponder={(e) =>
          e.nativeEvent.touches.length < 2 && scaleValue.current <= 1
        }>
        <Image
          source={source}
          resizeMode='contain'
          style={{
            width: '100%',
            height: '100%',
            transform: [{ rotate: '90deg' }],
          }}
        />
      </View>
    </ImageZoom>
  )
}

const PhotoSlideShowModalScreen = (props: PhotoSlideShowModalScreenProps) => {
  const { navigation, route } = props
  const imageViewerRef = useRef<Carousel<string>>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const colorScheme = useColorScheme()

  useEffect(() => {
    askUserToLeaveReview()
    setTimeout(() => {
      const index = route.params.photoIndex || 0
      imageViewerRef.current?.snapToItem(index, false)
    })
  }, [route.params.photoIndex])

  const handleOnSnapToItem = (inx: number) => {
    setActiveIndex(inx)
  }

  const renderItem = ({
    item,
    index,
  }: {
    item: ImageSourcePropType
    index: number
  }) => {
    return <ImageZoomItem source={item} />
  }

  const photos = route.params.photos || []

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        translucent={true}
        backgroundColor='transparent'
        barStyle='light-content'
      />
      <NavBar
        left={
          <NavBarButton
            colorScheme={colorScheme}
            icon={
              <Feather
                name='x'
                size={Theme.SIZES.TAB_BAR_ICON_SIZE}
                color={Theme.COLORS.WHITE}
                style={baseStyles.textShadow}
              />
            }
            onPress={() => navigation.dispatch(StackActions.pop())}
          />
        }
        title={
          photos.length && (
            <Text style={styles.page}>
              {' '}
              {activeIndex + 1}/{photos.length}{' '}
            </Text>
          )
        }
        style={styles.nav}
      />
      <Carousel
        ref={imageViewerRef}
        vertical={false}
        layout='default'
        data={photos}
        sliderWidth={Layout.window.width}
        itemWidth={Layout.window.width}
        onScrollIndexChanged={handleOnSnapToItem}
        inactiveSlideScale={0.85}
        inactiveSlideOpacity={1}
        keyExtractor={(_, i) => `carousel_${i}`}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create<any>({
  galleryButton: {
    alignItems: 'center',
    backgroundColor: Theme.COLORS.NEUTRAL,
    padding: Theme.SIZES.BASE / 2,
    borderRadius: Theme.SIZES.BASE,
  },
  safeArea: {
    backgroundColor: Theme.COLORS.TRANSPARENT,
    flex: 1,
    paddingTop: initialWindowMetrics?.insets.top || 0,
  },
  page: {
    ...baseStyles.thinTitle,
    ...baseStyles.textShadow,
    color: Theme.COLORS.WHITE,
  },
  nav: {
    backgroundColor: Theme.COLORS.TRANSPARENT,
    zIndex: 1,
    top: initialWindowMetrics?.insets.top || 0,
    left: 0,
    right: 0,
    position: 'absolute',
  },
})

export default PhotoSlideShowModalScreen
