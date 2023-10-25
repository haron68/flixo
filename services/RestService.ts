import { AppReviewModel } from '@models/AppReviewModel'
import { APP_REVIEW_KEY, DatabaseService } from './DatabaseService'
import dayjs from 'dayjs'
import * as StoreReview from 'expo-store-review'
import { TMDB_API_TOKEN, TMDB_API_URL } from 'react-native-dotenv'
import axios from 'axios'

export const requestAppReview = async () => {
  if (
    (await StoreReview.hasAction()) &&
    (await StoreReview.isAvailableAsync())
  ) {
    StoreReview.requestReview()
      .then(async () => {
        // increment the count of times requested
        const res =
          (await DatabaseService.get(APP_REVIEW_KEY)) ??
          '{"timesRequested":0,"lastRequestedTimestamp":0}'

        const appReview = JSON.parse(res) as AppReviewModel
        appReview.timesRequested += 1
        appReview.lastRequestedTimestamp = Date.now()
        await DatabaseService.set(APP_REVIEW_KEY, appReview)
      })
      .catch((e) => {
        console.error(e)
      })
  }
}

export const askUserToLeaveReview = async (timesRequested: number = 3) => {
  const res =
    (await DatabaseService.get(APP_REVIEW_KEY)) ??
    '{"timesRequested":0,"lastRequestedTimestamp":0}'
  const appReview = JSON.parse(res) as AppReviewModel

  if (appReview.timesRequested < timesRequested) {
    // if already asked user to leave a review wait 1 week before asking again
    if (dayjs().isAfter(dayjs(appReview.lastRequestedTimestamp), 'week')) {
      await requestAppReview()
    }
  }
}

const baseConfig = {
  headers: {
    Authorization: `Bearer ${TMDB_API_TOKEN}`
  }
}
export const getMoviesList = async () => {
  console.log('env -> ', TMDB_API_URL, TMDB_API_TOKEN)
  return axios.get(`${TMDB_API_URL}/3/movie/11`, baseConfig)
}
