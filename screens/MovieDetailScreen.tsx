import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, ImageBackground, RefreshControl, Route, StyleSheet } from 'react-native'
import { ScrollView, View } from '@components/Views'
import { Button } from '@components/Buttons'
import { Text } from '@components/Texts'
import Theme from '@assets/Theme'
import { NavigationProp } from '@react-navigation/native'
import { Block, Card, Icon } from 'galio-framework'
import { baseStyles } from '@assets/BaseStyles'
import { LinearGradient } from 'expo-linear-gradient'
import PopularityBadge from '@components/Views/PopularityBadge'
import dayjs from 'dayjs'
import { ToastModel } from '@models/ToastModel'
import { getMovieDetails } from '../services/RestService'
import Colors from '@constants/Colors'
import useColorScheme from '@hooks/useColorScheme'
import { openLink } from '../services/ShareService'

type Props = {
  navigation: NavigationProp<any>
  route: Route
}

const MovieDetailScreen = ({ navigation, route }: Props) => {
  const colorScheme = useColorScheme()
  const { data } = route.params
  const [toast, setToast] = useState<ToastModel>({ isShow: false })
  const [isRefresh, setRefresh] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [movie, setMovie] = useState(data)

  const handleOnRefresh = () => setRefresh(true)

  const handleOnGoWatchPress = () => {
    openLink(movie.homepage)
  }

  useEffect(() => {
    navigation.setOptions({
      title: movie.title,
      headerTitle: movie.title,
      headerLargeTitle: false,
    })

    setLoading(true)
    getMovieDetails(data.id)
      .then((res) => {
        const movieDetails = res.data
        setMovie(movieDetails)
      })
      .finally(() => {
        setLoading(false)
        setRefresh(false)
      })
  }, [isRefresh])

  if (!data) {
    return null
  }

  if (isLoading) {
    return (
      <View style={[baseStyles.container, baseStyles.centeredContainer]}>
        <ActivityIndicator size="large"/>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefresh}
            onRefresh={handleOnRefresh}
            colors={[Colors[colorScheme].text]} // Customize the color here
            tintColor={Colors[colorScheme].text} // iOS specific
            titleColor={Colors[colorScheme].text} // iOS specific
          />
        }
      >
        <Block flex>
          <ImageBackground source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}` }}
                           style={styles.header}>
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,1)']}
              style={[baseStyles.gradient, baseStyles.container]}
            >
              <Text
                h5
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.headerTitle}
              >
                {movie.title}
              </Text>
            </LinearGradient>
          </ImageBackground>
        </Block>
        <Block flex style={baseStyles.container}>
          <Block row style={styles.sectionTitle}>
            <Text>
              {`${movie.status ?? 'Release'} ${dayjs(movie.release_date).format('M/D/YY')}`}
            </Text>
            {movie.runtime && (
              <Text>
                {' • ' + movie.runtime} minutes
              </Text>
            )}
            {movie.popularity && (
              <>
                <Text>{' • '}</Text>
                <PopularityBadge popularity={movie.popularity}/>
              </>
            )}
          </Block>
          {movie.genres && (
            <Block row style={styles.sectionTitle}>
              <Text>Genres: {movie.genres.map(({ name }: any) => name).join(', ')}</Text>
            </Block>
          )}
          <Block row style={styles.sectionTitle}>
            <Block>
              <Text style={styles.sectionTitle}>Overview</Text>
              <Text>
                {movie.overview}
              </Text>
            </Block>
          </Block>
          <Block row style={styles.sectionTitle}>
            {movie?.production_companies && (
              <Block>
                <Text style={styles.sectionTitle}>Producers</Text>
                <Block row space="around" style={{ flexWrap: true, alignItems: 'center' }}>
                  {movie?.production_companies?.map(({ logo_path, name }: any) => {
                    if (!logo_path) {
                      return (<Text>{name}</Text>)
                    }
                    return (
                      <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w500/${logo_path}` }}
                        resizeMode="contain"
                        style={styles.prodLogo}
                      />
                    )
                  })}
                </Block>
              </Block>
            )}
          </Block>
        </Block>
      </ScrollView>
      {movie.homepage && (
        <Block style={styles.footer}>
          <Button round size="large" color="info" onPress={handleOnGoWatchPress}>
            Go Watch Now
          </Button>
        </Block>
      )}
    </View>

  )
}

const styles = StyleSheet.create({
  header: {
    height: 250,
    justifyContent: 'flex-end',
    padding: Theme.SIZES.BASE,
  },
  headerTitle: {
    fontWeight: 'bold',
    paddingVertical: Theme.SIZES.BASE,
    color: Theme.COLORS.GOLD,
  },
  sectionTitle: {
    ...baseStyles.thinTitle,
    paddingBottom: Theme.SIZES.BASE / 2,
    fontWeight: 'bold',
  },
  footer: {
    ...baseStyles.container,
    ...baseStyles.borderTopLine,
    width: '100%',
    paddingTop: 0,
    paddingBottom: Theme.SIZES.BASE * 2,
  },
  prodLogo: {
    height: 50,
    width: 100,
    marginRight: 10,
  },
})

export default MovieDetailScreen
