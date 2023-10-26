import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Platform, RefreshControl,
  StyleSheet,
} from 'react-native'
import { NavBarButton } from '@components/Buttons'
import { Text } from '@components/Texts'
import { View, FlatList } from '@components/Views'
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
import { Card, Toast } from 'galio-framework'
import Colors from '@constants/Colors'
import dayjs from 'dayjs'
import { useHeaderHeight } from '@react-navigation/elements'
import { ToastModel } from '@models/ToastModel'

type Props = {
  navigation: NavigationProp<any>
}

const HomeScreen = ({ navigation }: Props) => {
  const colorScheme = useColorScheme()
  const headerHeight = useHeaderHeight()
  const [toast, setToast] = useState<ToastModel>({ isShow: false })
  const [isRefresh, setRefresh] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [isLoadingMovies, setLoadingMovies] = useState(false)
  const [movies, setMovies] = useState<any[]>([])
  const [page, setPage] = useState<number>(1)

  const hasSeenIntro: boolean | undefined = useSelector((state: RootState) => state.settings.hasSeenIntro)

  const showToastError = () => {
    setToast({
      isShow: true,
      message: 'There was an issue retrieving movies please try again later.',
    })
    setTimeout(() => {
      setToast({
        isShow: false,
      })
    }, 2000)
  }

  const handleOnRefresh = () => setRefresh(true)

  const handleOnEndReached = (info: { distanceFromEnd: number }) => {
    console.log(info)
    setLoadingMovies(true)
    const nextPage = page + 1
    getMoviesList(nextPage)
      .then((res) => {
        const { results } = res.data
        setMovies([...movies, ...results])
        setPage(nextPage)
      })
      .catch((err) => {
        showToastError()
      })
      .finally(() => {
        setTimeout(() => {
          setLoadingMovies(false)
        }, 2000)
      })
  }

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
      .then((res) => {
        const { page, results } = res.data
        setMovies(results)
        setPage(page)
      })
      .catch((err) => {
        showToastError()
      })
      .finally(() => {
        setLoading(false)
        setRefresh(false)
      })
  }, [isRefresh])

  const renderFooter = () => {
    if (!isLoadingMovies) return null
    return <ActivityIndicator />
  }

  if (isLoading) {
    return (
      <View style={[baseStyles.container, baseStyles.centeredContainer]}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <View style={{flex: 1}}>
      <Toast
        isShow={toast.isShow}
        positionIndicator='top'
        positionOffset={Platform.select({ios: headerHeight + Theme.SIZES.NAVBAR_HEIGHT, android: 0})}
        color={Theme.COLORS.DANGER}
      >
        <Text style={{ color: Theme.COLORS.WHITE }}>{toast.message}</Text>
      </Toast>
      <FlatList
        data={movies}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={[baseStyles.container]}
        ListFooterComponent={renderFooter}
        onEndReached={handleOnEndReached}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={isRefresh}
            onRefresh={handleOnRefresh}
            colors={[Colors[colorScheme].text]} // Customize the color here
            tintColor={Colors[colorScheme].text} // iOS specific
            titleColor={Colors[colorScheme].text} // iOS specific
          />
        }
        renderItem={({ item: data }) => {
          return (
            <Card
              flex
              borderless
              style={baseStyles.card}
              title={data.title}
              titleColor={Colors[colorScheme].text}
              caption={`Release ${dayjs(data.release_date).format('M/D/YY')}`}
              location="Los Angeles, CA"
              avatar={`https://image.tmdb.org/t/p/w500/${data.backdrop_path}`}
              imageBlockStyle={baseStyles.imageBlockStyle}
              image={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
            />
          )
        }}
      />
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
