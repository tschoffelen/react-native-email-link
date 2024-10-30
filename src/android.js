import { EmailException } from "./email-exception";
import NativeEmail from './NativeEmail';

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
  try {
    const clientsPackageNames = await NativeEmail.getEmailClients();

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
  let text = options.removeText
    ? ""
    : options.title || "What app would you like to open?";

  let newTask = true;
  if ("newTask" in options) {
    newTask = Boolean(options.newTask);
  }

  try {
    if (options.app) {
      await NativeEmail.openWith(options.app);
    } else {
      await NativeEmail.open(text, newTask);
    }
  } catch (error) {
    if (error.code === "NoEmailAppsAvailable") {
      throw new EmailException("No email apps available");
    }
  }
}

/**
 * Open an email app on the compose screen, or let the user choose what app to open on the compose screen.
 * You can pass `id` to open a specific app, or `null` to let the user choose. (`id` can be retrieved with `getEmailClients`
 *
 * @param {{
 *     app: string | undefined | null,
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
    return NativeEmail.composeWith(
      options.app,
      text,
      options.to,
      options.subject || "",
      body,
      options.cc,
      options.bcc,
    );
  }

  return NativeEmail.compose(
    text,
    options.to,
    options.subject || "",
    body,
    options.cc,
    options.bcc,
  );
}
