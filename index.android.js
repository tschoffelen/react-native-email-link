/**
 * React Native Email Link
 *
 * This file supports both iOS and Android.
 */

import { NativeModules } from 'react-native';
import { EmailException } from './src/email-exception';
export { EmailException };

/**
 * Open an email app, or let the user choose what app to open.
 *
 * @param {{
 *     app: string | undefined | null,
 *     title: string,
 *     message: string,
 *     cancelLabel: string,
 * }} options
 */
export async function openInbox(options = {}) {
  // We can't pre-choose, since we use native intents
  if (!('Email' in NativeModules)) {
    throw new EmailException(
      'NativeModules.Email does not exist. Check if you installed the Android dependencies correctly.'
    );
  }

  let text = options.title || 'What app would you like to open?';
  if (options.removeText) {
    text = '';
  }

  let newTask = true;
  if ('newTask' in options) {
    newTask = Boolean(options.newTask);
  }

  NativeModules.Email.open(text, newTask);
  return;
}

/**
 * Open an email app on the compose screen, or let the user choose what app to open on the compose screen.
 *
 * @param {{
 *     title: string,
 *     removeText: boolean,
 *     to: string,
 *     subject: string,
 *     body: string,
 *     encodeBody: boolean
 * }} options
 */
export async function openComposer(options = {}) {
  let body = options.body || '';
  let text = options.title || 'What app would you like to open?';
  if (options.removeText) {
    text = '';
  }

  if (options.encodeBody) {
    body = encodeURIComponent(body);
  }

  NativeModules.Email.compose(text, options.to, options.subject || '', body);
  return;
}
