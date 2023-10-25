import React, { useEffect, useRef, useState } from 'react'
import { Alert, ColorSchemeName, Platform } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ListItemOption } from '@components/Inputs'
import { Text } from '@components/Texts'
import { ListItem, ScrollView, showRateAppAlert} from '@components/Views'
import { ToastModel } from '@models/ToastModel'
import { settingsActions } from '@store/settingsSlice'
import useColorScheme from '@hooks/useColorScheme'
import { baseStyles, bottomSheetStyleProps } from '@assets/BaseStyles'
import Theme from '@assets/Theme'
import { DatabaseService } from '../services/DatabaseService'
import { askUserToLeaveReview } from '../services/RestService'
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { useHeaderHeight } from '@react-navigation/elements'
import { NavigationProp } from '@react-navigation/native'
import Constants from 'expo-constants'
import { Block, Toast } from 'galio-framework'
import {
  Key,
  Like1,
  Monitor,
  Moon,
  Sun1,
  Trash,
} from 'iconsax-react-native'
import { capitalize } from 'lodash'
import { RootState } from '@store/store'

type Props = {
  navigation: NavigationProp<any>
}

const SettingsScreen = ({ navigation }: Props) => {
  const colorScheme = useColorScheme()
  const dispatch = useDispatch()
  const headerHeight = useHeaderHeight()
  const theme: ColorSchemeName | 'system' = useSelector(
    (state: RootState) => state.settings.systemAppearance ?? 'dark'
  )
  const iconBackgroundColor =
    colorScheme == 'dark' ? Theme.COLORS.WHITE : Theme.COLORS.DARK
  const [openAppDisplay, setOpenAppDisplay] = useState(false)
  const [openPrivacy, setOpenPrivacy] = useState(false)
  const [toast, setToast] = useState<ToastModel>({ isShow: false })

  const displayBottomSheetModalRef = useRef<BottomSheetModal>(null)
  const privacyBottomSheetModalRef = useRef<BottomSheetModal>(null)
  const appearanceOptions = [
    {
      icon: (
        <Sun1
          color={iconBackgroundColor}
          size={Theme.SIZES.BASE * 1.5}
          variant='Bulk'
        />
      ),
      name: 'Light',
    },
    {
      icon: (
        <Moon
          color={iconBackgroundColor}
          size={Theme.SIZES.BASE * 1.5}
          variant='Bulk'
        />
      ),
      name: 'Dark',
    },
    {
      icon: (
        <Monitor
          color={iconBackgroundColor}
          size={Theme.SIZES.BASE * 1.5}
          variant='Bulk'
        />
      ),
      name: 'System',
    },
  ]

  const handleThemeChange = (scheme: ColorSchemeName | 'system') => {
    askUserToLeaveReview()
    dispatch(settingsActions.setSystemAppearance(scheme))
  }

  const handleOnClearData = () => {
    Alert.alert(
      'Please Confirm',
      'This action will delete all your locally stored data with Flixo.',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Confirm',
          style: 'destructive',
          onPress: async () => {
            await DatabaseService.clear('secure')
            await DatabaseService.clear('async')
            setToast({
              isShow: true,
              message: 'Locally stored data had been deleted',
            })
            setTimeout(() => {
              setToast({
                isShow: false,
              })
            }, 2000)
          },
        },
      ]
    )
  }

  useEffect(() => {
    if (displayBottomSheetModalRef.current) {
      if (openAppDisplay) {
        displayBottomSheetModalRef.current?.present()
      } else {
        displayBottomSheetModalRef.current?.dismiss()
      }
    }
  }, [openAppDisplay])

  useEffect(() => {
    if (privacyBottomSheetModalRef.current) {
      if (openPrivacy) {
        privacyBottomSheetModalRef.current?.present()
      } else {
        privacyBottomSheetModalRef.current?.dismiss()
      }
    }
  }, [openPrivacy])

  return (
    <>
      <Toast
        isShow={toast.isShow}
        positionIndicator='top'
        positionOffset={Platform.select({ios: headerHeight + Theme.SIZES.NAVBAR_HEIGHT, android: 0})}>
        <Text style={{ color: Theme.COLORS.WHITE }}>{toast.message}</Text>
      </Toast>
      <ScrollView contentContainerStyle={baseStyles.container}>
        {/*<Block style={{ marginBottom: Theme.SIZES.BASE }}>*/}
        {/*  <Text style={baseStyles.thinTitleL}>Security</Text>*/}
        {/*  <ListItem*/}
        {/*    colorScheme={colorScheme}*/}
        {/*    item={{*/}
        {/*      icon: <Lock color={iconBackgroundColor} size={Theme.SIZES.BASE * 1.5} variant='Bulk'/>,*/}
        {/*      name: 'Change Pin',*/}
        {/*    }}*/}
        {/*    onPress={() => null}*/}
        {/*  />*/}
        {/*  <ListItemOption*/}
        {/*    colorScheme={colorScheme}*/}
        {/*    item={{*/}
        {/*      icon: <FingerScan color={iconBackgroundColor} size={Theme.SIZES.BASE * 1.5} variant='Bulk'/>,*/}
        {/*      name: 'Enable Biometric Lock',*/}
        {/*    }}*/}
        {/*    onPress={() => null}*/}
        {/*  />*/}
        {/*</Block>*/}
        <Block style={{ marginBottom: Theme.SIZES.BASE }}>
          <Text style={baseStyles.thinTitleL}>Appearance</Text>
          <ListItem
            colorScheme={colorScheme}
            item={{
              icon:
                colorScheme == 'light' ? (
                  <Sun1
                    color={iconBackgroundColor}
                    size={Theme.SIZES.BASE * 1.5}
                    variant='Bulk'
                  />
                ) : (
                  <Moon
                    color={iconBackgroundColor}
                    size={Theme.SIZES.BASE * 1.5}
                    variant='Bulk'
                  />
                ),
              name: 'App Display',
              subtitle: capitalize(theme!),
            }}
            onPress={() => setOpenAppDisplay(!openAppDisplay)}
          />
        </Block>
        <Block style={{ marginBottom: Theme.SIZES.BASE }}>
          <Text style={baseStyles.thinTitleL}>About</Text>
          <ListItem
            colorScheme={colorScheme}
            item={{
              icon: (
                <Key
                  color={iconBackgroundColor}
                  size={Theme.SIZES.BASE * 1.5}
                  variant='Bulk'
                />
              ),
              name: 'Privacy Statement',
            }}
            onPress={() => setOpenPrivacy(!openPrivacy)}
          />
          <ListItem
            colorScheme={colorScheme}
            item={{
              icon: (
                <Like1
                  color={iconBackgroundColor}
                  size={Theme.SIZES.BASE * 1.5}
                  variant='Bulk'
                />
              ),
              name: 'Rate App',
            }}
            onPress={showRateAppAlert}
          />
          <ListItem
            colorScheme={colorScheme}
            item={{
              icon: (
                <Trash
                  color={Theme.COLORS.DANGER}
                  size={Theme.SIZES.BASE * 1.5}
                  variant='Bulk'
                />
              ),
              name: 'Clear Local Data',
              nameStyle: {
                color: Theme.COLORS.DANGER,
              },
            }}
            onPress={handleOnClearData}
          />
        </Block>
        <Block row space='between' style={{ marginBottom: Theme.SIZES.BASE }}>
          <Text style={{ fontWeight: '100' }}>
            Version: {Constants.manifest?.version}
          </Text>
          <Text style={{ fontWeight: '100' }}>
            © {new Date().getFullYear()} Flixo
          </Text>
        </Block>
      </ScrollView>
      {openAppDisplay && (
        <BottomSheetModal
          ref={displayBottomSheetModalRef}
          index={0}
          snapPoints={['50%']}
          enablePanDownToClose={true}
          onDismiss={() => setOpenAppDisplay(false)}
          {...bottomSheetStyleProps(colorScheme)}>
          <BottomSheetFlatList
            ListHeaderComponent={
              <Block
                row
                style={{
                  marginBottom: Theme.SIZES.BASE,
                }}>
                <Text style={[baseStyles.thinTitle, { fontWeight: 'bold' }]}>
                  Set App Appearance
                </Text>
              </Block>
            }
            contentContainerStyle={{ paddingBottom: Theme.SIZES.BASE * 4 }}
            data={appearanceOptions}
            renderItem={({ item }) => (
              <ListItemOption
                colorScheme={colorScheme}
                selected={item.name.toLowerCase() == theme}
                showSwitch={true}
                multiple={false}
                item={{
                  icon: item.icon,
                  name: item.name,
                }}
                onPress={() => handleThemeChange(item.name.toLowerCase())}
              />
            )}
            style={baseStyles.container}
          />
        </BottomSheetModal>
      )}
      {openPrivacy && (
        <BottomSheetModal
          ref={privacyBottomSheetModalRef}
          index={0}
          snapPoints={['50%']}
          enablePanDownToClose={true}
          onDismiss={() => setOpenPrivacy(false)}
          {...bottomSheetStyleProps(colorScheme)}>
          <BottomSheetView style={baseStyles.container}>
            <Block
              row
              style={{
                marginBottom: Theme.SIZES.BASE,
              }}>
              <Text style={[baseStyles.thinTitle, { fontWeight: 'bold' }]}>
                Privacy Statement
              </Text>
            </Block>

            <Text style={[{ marginBottom: Theme.SIZES.BASE }]}>
              Your data is secure on your device and never transmitted to any
              remote server on the internet. It is safely stored on your device
              only. We do not collect alter or manipulate any images. All data
              is handled locally on your device.
            </Text>
          </BottomSheetView>
        </BottomSheetModal>
      )}
    </>
  )
}

export default SettingsScreen
