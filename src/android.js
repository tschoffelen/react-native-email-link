import { NativeModules } from "react-native";
import { EmailException } from "./email-exception";

/**
 * Get available email clients
 * iOS -> returns a list of app names, e.g. ['apple-mail', 'gmail', 'outlook']
 * Android -> returns a list of app package names, e.g. ['com.google.android.gm', 'com.microsoft.office.outlook']
 * @returns {Promise<string[]>}
 */
export async function getEmailClients() {
  if (!("Email" in NativeModules)) {
    throw new EmailException(
      "NativeModules.Email does not exist. Check if you installed the Android dependencies correctly."
    );
  }

  try {
    return NativeModules.Email.getEmailClients();
  } catch (error) {
    if (error.code === "NoEmailAppsAvailable") {
      throw new EmailException("No email apps available");
    }
  }
}

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

  let text = options.removeText
    ? ""
    : options.title || "What app would you like to open?";

  let newTask = true;
  if ("newTask" in options) {
    newTask = Boolean(options.newTask);
  }

  try {
    await NativeModules.Email.open(text, newTask);
  } catch (error) {
    if (error.code === "NoEmailAppsAvailable") {
      throw new EmailException("No email apps available");
    }
  }
}

/**
 * Open an email app on the compose screen, or let the user choose what app to open on the compose screen.
 * Android - app should be a package name, e.g. 'com.google.android.gm' (use getEmailClients() to get a list of available clients)
 * iOS - app should be an app name, e.g. 'gmail' (use getEmailClients() to get a list of available clients)
 *
 * @param {{
 *     title: string,
 *     removeText: boolean,
 *     to: string,
 *     cc: string,
 *     bcc: string,
 *     subject: string,
 *     body: string,
 *     encodeBody: boolean
 * }} options
 */
export async function openComposer(options = {}) {
  let body = options.body || "";
  let text = options.title || "What app would you like to open?";
  if (options.removeText) {
    text = "";
  }

  if (options.encodeBody) {
    body = encodeURIComponent(body);
  }

  if (options.app) {
    return NativeModules.Email.composeWith(
      options.app,
      text,
      options.to,
      options.subject || "",
      body,
      options.cc,
      options.bcc
    );
  }

  return NativeModules.Email.compose(
    text,
    options.to,
    options.subject || "",
    body,
    options.cc,
    options.bcc
  );
}
