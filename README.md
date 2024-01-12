# React Native Email Link

[![GitHub release](https://img.shields.io/npm/v/react-native-email-link.svg)](https://www.npmjs.com/package/react-native-email-link)
[![NPM](https://img.shields.io/npm/dm/react-native-email-link.svg)](https://www.npmjs.com/package/react-native-email-link)
[![GitHub license](https://img.shields.io/github/license/flexible-agency/react-native-email-link.svg)](https://github.com/flexible-agency/react-native-email-link/blob/master/LICENSE)

---

An easy way to open an email app of the user's choice, based on the apps they have installed
on their device. Very helpful for magic link logins.

Currently supported apps:

- Apple Mail
- Gmail
- Inbox
- Spark
- Airmail
- Outlook
- Yahoo Mail
- Superhuman
- Yandex
- ProtonMail
- Fastmail

## Installation

### 1. Install the package

```
yarn add react-native-email-link
```

This package works with autolinking on RN>=0.60. If you're using an earlier version of React Native, please install version `1.4.0` of the library, or
check out the legacy [rnpm](https://github.com/leanmotherfuckers/react-native-email-link/tree/rnpm) branch.

### 2. Post-install steps

Based on the platforms your app supports, you also need to:

<details>
<summary><strong>iOS – Update Info.plist</strong></summary>

To allow your app to detect if any of the mailbox apps are installed, an extra step is required on iOS. Your app needs to provide the `LSApplicationQueriesSchemes` key inside `ios/{my-project}/Info.plist` to specify the URL schemes with which the app can interact.

Just add this in your `Info.plist` depending on which apps you'd like to support. Omitting these might mean that the library can't detect some of the maps apps installed by the user.

```xml
<key>LSApplicationQueriesSchemes</key>
<array>
    <string>mailto</string>
    <string>message</string>
    <string>readdle-spark</string>
    <string>airmail</string>
    <string>ms-outlook</string>
    <string>googlegmail</string>
    <string>inbox-gmail</string>
    <string>ymail</string>
    <string>superhuman</string>
    <string>yandexmail</string>
    <string>fastmail</string>
    <string>protonmail</string>
    <string>szn-email</string>
</array>
```

</details>

<details>
<summary><strong>Expo – Enable Config Plugin</strong></summary>

To allow the library to work with Expo you need to enable the [config plugin](https://docs.expo.dev/guides/config-plugins/). This plugin will automatically configure your Expo application with the correct settings for this library to function.

To enable the config plugin, add it to the `plugins` array inside your `app.config.js`/`app.config.json`. For example:

```json
{
  "name": "my app",
  "plugins": ["react-native-email-link"]
}
```

Want this library to work on Android too? Because the library uses native code on Android you need to [follow Expo's guide](https://docs.expo.dev/workflow/customizing/) for custom native code.

</details>

## Usage

### openInbox

```javascript
import { openInbox } from "react-native-email-link";

openInbox();
```

#### Arguments

- [`title`](#title)
- [`message`](#message)
- [`cancelLabel`](#cancelLabel)
- [`removeText`](#removeText)
- [`defaultEmailLabel`](#defaultEmailLabel)
- [`newTask`](#newTask)

#### `title`

Text for the top of the ActionSheet or Intent.

| Type   | Required | Default         |
| ------ | -------- | --------------- |
| string | No       | 'Open mail app' |

#### `message`

Subtext under the title on the ActionSheet

| Type   | Required | Default                             | Platform |
| ------ | -------- | ----------------------------------- | -------- |
| string | No       | 'Which app would you like to open?' | iOS      |

#### `cancelLabel`

Text for last button of the ActionSheet.

| Type   | Required | Default  | Platform |
| ------ | -------- | -------- | -------- |
| string | No       | 'Cancel' | iOS      |

#### `removeText`

If true, not text will be show above the ActionSheet or Intent. Default value is false.

| Type    | Required | Default |
| ------- | -------- | ------- |
| boolean | No       | false   |

#### `defaultEmailLabel`

Text for first button of the ActionSheet.

| Type   | Required | Default                | Platform |
| ------ | -------- | ---------------------- | -------- |
| string | No       | 'Default email reader' | iOS      |

#### `newTask`

If true, the email Intent will be started in a new Android task. Else, the Intent will be launched in the current task.

Read more about Android tasks [here](https://developer.android.com/guide/components/activities/tasks-and-back-stack).

| Type    | Required | Default | Platform |
| ------- | -------- | ------- | -------- |
| boolean | No       | true    | Android  |

#### Example

```javascript
import { openInbox } from "react-native-email-link";

openInbox({
  message: "Whatcha wanna do?",
  cancelLabel: "Go back!",
});
```

### openComposer

```javascript
import { openComposer } from "react-native-email-link";

openComposer();
```

#### Arguments

- [`app`](#app)
- [`title`](#title)
- [`message`](#message) (iOS only)
- [`cancelLabel`](#cancelLabel) (iOS only)
- [`removeText`](#removeText)
- [`defaultEmailLabel`](#defaultEmailLabel)
- [`to`](#to)
- [`cc`](#cc)
- [`bcc`](#bcc)
- [`subject`](#subject)
- [`body`](#body)
- [`encodeBody`](#encodeBody)

#### `app`

App to open the composer in

| Type   | Required | Example         |
| ------ | -------- | --------------- |
| string | No       | Android - package name, e.g. `com.mail.app` |
|        |          | iOS - app slug, e.g. `gmail` |

#### `title`

Text for the top of the ActionSheet or Intent.

| Type   | Required | Default         |
| ------ | -------- | --------------- |
| string | No       | 'Open mail app' |

#### `message`

Subtext under the title on the ActionSheet.

| Type   | Required | Default                             | Platform |
| ------ | -------- | ----------------------------------- | -------- |
| string | No       | 'Which app would you like to open?' | iOS      |

#### `cancelLabel`

Text for last button of the ActionSheet.

| Type   | Required | Default  | Platform |
| ------ | -------- | -------- | -------- |
| string | No       | 'Cancel' | iOS      |

#### `removeText`

If true, not text will be show above the ActionSheet or Intent. Default value is false.

| Type    | Required | Default |
| ------- | -------- | ------- |
| boolean | No       | false   |

#### `defaultEmailLabel`

Text for first button of the ActionSheet.

| Type   | Required | Default                | Platform |
| ------ | -------- | ---------------------- | -------- |
| string | No       | 'Default email reader' | iOS      |

#### `to`

Recipient's email address.

| Type   | Required | Default |
| ------ | -------- | ------- |
| string | No       | null    |

#### `cc`

Email's cc.

| Type   | Required | Default |
| ------ | -------- | ------- |
| string | No       | null    |

#### `bcc`

Email's bcc.

| Type   | Required | Default |
| ------ | -------- | ------- |
| string | No       | null    |

#### `subject`

Email's subject.

| Type   | Required | Default |
| ------ | -------- | ------- |
| string | No       | null    |

#### `body`

Email's body.

| Type   | Required | Default |
| ------ | -------- | ------- |
| string | No       | null    |

#### `encodeBody`

Apply `encodeURIComponent` to the email's body.

| Type    | Required | Default |
| ------- | -------- | ------- |
| boolean | No       | false   |

#### Example

```javascript
import { openComposer } from "react-native-email-link";

openComposer({
  to: "support@example.com",
  subject: "I have a question",
  body: "Hi, can you help me with...",
});
```

### getEmailClients

```javascript
import { getEmailClients } from "react-native-email-link";

const clients = await getEmailClients();

console.log(clients)
[
  {
    app: 'gmail', // iOS only
    prefix: 'gmail://',
    title: 'GMail',
    packageName: '' // Android only
  }
]
```
---

<div align="center">
	<b>
		<a href="https://schof.co/consulting/?utm_source=flexible-agency/react-native-email-link">Get professional support for this package →</a>
	</b>
	<br>
	<sub>
		Custom consulting sessions available for implementation support or feature development.
	</sub>
</div>
