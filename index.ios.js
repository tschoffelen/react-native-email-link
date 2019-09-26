/**
 * React Native Email Link
 *
 * This file supports both iOS and Android.
 */

import { ActionSheetIOS, Alert, Linking } from "react-native";
import { option } from "@oclif/parser/lib/flags";

class EmailException {
  constructor(message) {
    this.message = message;
    this.name = "EmailException";
  }
}

const prefixes = {
  "apple-mail": "message://",
  gmail: "googlegmail://",
  inbox: "inbox-gmail://",
  spark: "readdle-spark://",
  airmail: "airmail://",
  outlook: "ms-outlook://",
  yahoo: "ymail://",
  superhuman: "superhuman://"
};

const titles = {
  "apple-mail": "Mail",
  gmail: "Gmail",
  inbox: "Inbox",
  spark: "Spark",
  airmail: "Airmail",
  outlook: "Outlook",
  yahoo: "Yahoo Mail",
  superhuman: "Superhuman"
};

/**
 * Available params for each app url
 *  - airmail: https://help.airmailapp.com/en-us/article/airmail-ios-url-scheme-1q060gy/
 *  - gmail: https://stackoverflow.com/questions/32114455/open-gmail-app-from-my-app 
 */
const uriParams = {
  gmail: {
    path: 'co',
    to: 'to',
    cc: 'cc',
    bcc: 'bcc',
    subject: 'subject',
    body: 'body'
  },
  airmail: {
    path: 'compose',
    to: 'to',
    cc: 'cc',
    bcc: 'bcc',
    subject: 'subject',
    body: 'htmlBody',
  }
}

/**
 * Returns param to open app compose screen and pre-fill 'to', 'subject' and 'body',
 * @param {string} app 
 * @param {{
 *     to: string,
 *     subject: string,
 *     body: string
 * }} options 
 */
function getUrlParams(app, options) {
  const appParms = uriParams[app];
  if (!appParms) { return "" };

  const urlParams = Object.keys(appParms).reduce((params, currentParam) => {
    if (options[currentParam]) {
      params.push(`${appParms[currentParam]}=${options[currentParam]}`);
    }
    return params;
  }, [])
  
  return `${appParms['path']}?${urlParams.join('&')}`
}

/**
 * Check if a given mail app is installed.
 *
 * @param {string} app
 * @returns {Promise<boolean>}
 */
export function isAppInstalled(app) {
  return new Promise(resolve => {
    if (!(app in prefixes)) {
      return resolve(false);
    }

    Linking.canOpenURL(prefixes[app])
      .then(isSupported => {
        resolve(isSupported);
      })
      .catch(() => resolve(false));
  });
}

/**
 * Ask the user to choose one of the available mail apps.
 * @param title
 * @param message
 * @param cancelLabel
 * @param removeText
 * @returns {Promise<String|null>}
 */
export function askAppChoice(
  title = "Open mail app",
  message = "Which app would you like to open?",
  cancelLabel = "Cancel",
  removeText = false
) {
  return new Promise(async resolve => {
    let availableApps = [];
    for (let app in prefixes) {
      let avail = await isAppInstalled(app);
      if (avail) {
        availableApps.push(app);
      }
    }
    console.log('availableApps: ', availableApps);
    if (availableApps.length < 2) {
      console.log()
      return resolve(availableApps[0] || null);
    }

    let options = availableApps.map(app => titles[app]);
    options.push(cancelLabel);

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: options,
        cancelButtonIndex: options.length - 1,
        ...(removeText ? {} : { title, message })
      },
      buttonIndex => {
        if (buttonIndex === options.length - 1) {
          return resolve(null);
        }
        return resolve(availableApps[buttonIndex]);
      }
    );

    return;
  });
}

/**
 * Open an email app, or let the user choose what app to open.
 *
 * @param {{
 *     app: string | undefined | null,
 *     title: string,
 *     message: string,
 *     cancelLabel: string,
 *     removeText: boolean,
 * }} options
 */
export async function openInbox(options = {}) {
  if (!options || typeof options !== "object") {
    throw new EmailException(
      "First parameter of `openInbox` should contain object with options."
    );
  }
  if (
    "app" in options &&
    options.app &&
    Object.keys(prefixes).indexOf(options.app) < 0
  ) {
    throw new EmailException(
      'Option `app` should be undefined, null, or one of the following: "' +
        Object.keys(prefixes).join('", "') +
        '".'
    );
  }

  let { app = null } = options;

  if (!app) {
    const { title, message, cancelLabel, removeText } = options;
    app = await askAppChoice(title, message, cancelLabel, removeText);
  }

  let url = null;
  switch (app) {
    default:
      url = prefixes[app];
  }

  let params = '';
  if(options.to || options.subject || options.body) {
    params = getUrlParams(app, options);
  }

  if (url) {
    return Linking.openURL(`${url}${params}`);
  }
}
