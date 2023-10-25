import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'

export const APP_REVIEW_KEY = 'appReviewKey'
export const SETTINGS_KEY = 'settingsKey'

export class DatabaseService {
  private static secureKeys: string[] = []

  public static async get(
    key: string,
    type: 'secure' | 'async' = 'async'
  ): Promise<string | null> {
    switch (type) {
      case 'async':
        try {
          return await AsyncStorage.getItem(key)
        } catch (e) {
          return ''
        }
      case 'secure':
        return SecureStore.getItemAsync(key)
    }
  }

  public static async set(
    key: string,
    value: object | string | number,
    type: 'secure' | 'async' = 'async'
  ): Promise<any> {
    const val: string = JSON.stringify(value)
    switch (type) {
      case 'async':
        try {
          return await AsyncStorage.setItem(key, val)
        } catch (e) {
          return e
        }
      case 'secure':
        if (!(key in this.secureKeys)) {
          this.secureKeys.push(key)
        }
        return SecureStore.setItemAsync(key, val)
    }
  }

  public static async remove(
    key: string,
    type: 'secure' | 'async' = 'async'
  ): Promise<any> {
    switch (type) {
      case 'async':
        try {
          return await AsyncStorage.removeItem(key)
        } catch (e) {
          return e
        }
      case 'secure':
        this.secureKeys.splice(this.secureKeys.indexOf(key), 1)
        return SecureStore.deleteItemAsync(key)
    }
  }

  public static async clear(type: 'secure' | 'async' = 'async'): Promise<any> {
    switch (type) {
      case 'async':
        const keys = await AsyncStorage.getAllKeys()
        try {
          return await AsyncStorage.multiRemove(keys)
        } catch (e) {
          return e
        }
      case 'secure':
        this.secureKeys.forEach((key) => SecureStore.deleteItemAsync(key))
        this.secureKeys = []
        return
    }
  }
}
