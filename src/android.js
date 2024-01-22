import { NativeModules } from "react-native";
import { EmailException } from "./email-exception";

const titles = {
  "com.google.android.gm": "Gmail",
  "com.readdle.spark": "Spark",
  "com.gemini.airmail": "AirMail",
  "com.microsoft.office.outlook": "Outlook",
  "com.yahoo.mobile.client.android.mail": "Yahoo Mail",
  "com.superhuman.mail": "Superhuman",
  "ru.yandex.mail": "Yandex Mail",
  "com.fastmail.app": "Fastmail",
  "ch.protonmail.android": "ProtonMail",
  "cz.seznam.email": "Seznam Email",
};

/**
 * Get available email clients
 *
 * @returns {Promise<{
 *   androidPackageName: string;
 *   title: string;
 *   prefix: string;
 *   iOSAppName: string;
 *   id: string;
 * }[]>}
 */
export async function getEmailClients() {
  if (!("Email" in NativeModules)) {
    throw new EmailException(
      "NativeModules.Email does not exist. Check if you installed the Android dependencies correctly."
    );
  }

  try {
    const clientsPackageNames = await NativeModules.Email.getEmailClients();

    return clientsPackageNames.reduce((acc, packageName) => {
      const title = titles[packageName] || "";

      if (title) {
        acc.push({
          androidPackageName: packageName, // Android only
          title,
          prefix: "", // iOS only
          iOSAppName: "", // iOS only
          id: packageName,
        });

        return acc;
      }

      return acc;
    }, []);
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
 * iOS - app should be an app name, e.g. 'gmail' (use getEmailClients() to get a list of available clients - `app`)
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
