import { openBrowserAsync } from 'expo-web-browser'

export const openLink = async (
  link: string
) => {
  try {
    await openBrowserAsync(encodeURI(link), { enableBarCollapsing: true })
  } catch (e) {
    console.error(e)
  }
}
