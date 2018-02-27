/**
 * React Native Email Link
 *
 * This file supports both iOS and Android.
 */

import { Platform, Alert, ActionSheetIOS, Linking } from 'react-native'

class EmailException {
  constructor (message) {
    this.message = message
    this.name = 'EmailException'
  }
}

const isIOS = Platform.OS === 'ios'

const prefixes = {
  'apple-mail': 'message://',
  'gmail': 'googlegmail://',
  'inbox': 'inbox-gmail://',
  'spark': 'readdle-spark://',
  'airmail': 'airmail://',
  'outlook': 'ms-outlook://'
}

const titles = {
  'apple-mail': 'Mail',
  'gmail': 'Gmail',
  'inbox': 'Inbox',
  'spark': 'Spark',
  'airmail': 'Airmail',
  'outlook' : 'Outlook'
}

/**
 * Check if a given map app is installed.
 *
 * @param {string} app
 * @returns {Promise<boolean>}
 */
export function isAppInstalled (app) {
  return new Promise((resolve) => {
    if (!(app in prefixes)) {
      return resolve(false)
    }

    Linking.canOpenURL(prefixes[app])
      .then((result) => {
        resolve(!!result)
      })
      .catch(() => resolve(false))
  })
}

/**
 * Ask the user to choose one of the available map apps.
 * @param title
 * @param message
 * @returns {Promise<String|null>}
 */
export function askAppChoice (title = 'Open mail app', message = 'Which app would you like to open?') {
  return new Promise(async (resolve) => {
    let availableApps = []
    for (let app in prefixes) {
      let avail = await isAppInstalled(app)
      if (avail) {
        availableApps.push(app)
      }
    }
    if (availableApps.length < 2) {
      return resolve(availableApps[0] || null)
    }

    if (isIOS) {
      let options = availableApps.map((app) => titles[app])
      options.push('Cancel')

      ActionSheetIOS.showActionSheetWithOptions({
        title: title,
        message: message,
        options: options,
        cancelButtonIndex: options.length - 1
      }, (buttonIndex) => {
        if (buttonIndex === options.length - 1) {
          return resolve(null)
        }
        return resolve(availableApps[buttonIndex])
      })

      return
    }

    let options = availableApps.map((app) => ({text: titles[app], onPress: () => resolve(app)}))
    options.push({text: 'Cancel', onPress: () => resolve(null), style: 'cancel'})
    Alert.alert(
      title,
      message,
      options,
      {onDismiss: () => resolve(null)}
    )
  })
}

/**
 * Open an email app, or let the user choose what app to open.
 *
 * @param {{
 *     app: string | undefined | null
 * }} options
 */
export async function openInbox (options = {}) {
  if (!options || typeof options !== 'object') {
    throw new EmailException('First parameter of `openInbox` should contain object with options.')
  }
  if ('app' in options && options.app && Object.keys(prefixes).indexOf(options.app) < 0) {
    throw new EmailException('Option `app` should be undefined, null, or one of the following: "' + Object.keys(prefixes).join('", "') + '".')
  }

  let lat = parseFloat(options.latitude)
  let lng = parseFloat(options.longitude)
  let query = options.query && options.query.length ? options.query : null
  let app = options.app && options.app.length ? options.app : null

  if (!app) {
    app = await askAppChoice()
  }

  let url = null
  switch (app) {
    default:
      url = prefixes[app]
  }

  if (url) {
    return Linking.openURL(url)
  }
}
