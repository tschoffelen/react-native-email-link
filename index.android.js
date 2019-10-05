/**
 * React Native Email Link
 *
 * This file supports both iOS and Android.
 */

import { NativeModules } from "react-native";

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
  if (!("Email" in NativeModules)) {
    throw new EmailException(
      "NativeModules.Email does not exist. Check if you installed the Android dependencies correctly."
    );
  }

  let text = options.title || "What app would you like to open?";
  if (options.removeText) {
    text = '';
  }

  let newTask = true;
  if ("newTask" in options) {
    newTask = Boolean(options.newTask);
  }

  NativeModules.Email.open(text, newTask);
  return;
}
