/**
 * React Native Email Link
 *
 * This file supports both iOS and Android.
 */

import { openInbox, openComposer, getEmailClients } from "./src/android";
import { EmailException } from "./src/email-exception";

export { EmailException, openInbox, openComposer, getEmailClients };
