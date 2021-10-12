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
</array>
```

Using Expo? [Read the instructions](docs/expo.md) to make it work on iOS.

</details>

<details>
<summary><strong>Android – Update AndroidManifest.xml</strong></summary>

When switching to Android 11/Android SDK 30 (i.e. using Expo SDK 41), this library doesn't work out of the box anymore. The reason is the new [Package Visibilty](https://developer.android.com/training/package-visibility) security feature. We'll have to update our `AndroidManifest.xml` to explicitly allow querying for other apps.

You can do so by coping the `<queries>` statement below, and pasting it in the top level of your AndroidManifest (i.e. within the `<manifest> ... </manifest>`).

```xml
<queries>
  <intent>
    <action android:name="android.intent.action.VIEW" />
    <data android:scheme="mailto"/>
  </intent>
</queries>
```

</details>

<details>
<summary><strong>Expo – Update app.json</strong></summary>

[Read the instructions here](docs/expo.md) to make it work on iOS.

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

- [`title`](#title)
- [`message`](#message) (iOS only)
- [`cancelLabel`](#cancelLabel) (iOS only)
- [`removeText`](#removeText)
- [`to`](#to)
- [`cc`](#cc) (iOS only)
- [`bcc`](#bcc) (iOS only)
- [`subject`](#subject)
- [`body`](#body)
- [`encodeBody`](#encodeBody)

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

#### `to`

Recipient's email address.

| Type   | Required | Default |
| ------ | -------- | ------- |
| string | No       | null    |

#### `cc`

Email's cc (iOS only).

| Type   | Required | Default |
| ------ | -------- | ------- |
| string | No       | null    |

#### `bcc`

Email's bcc (iOS only).

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

## Authors

This library is developed by [Flexible Agency](https://flexible.agency/), a tech consulting
company like no other.

Contributors:

- Thomas Schoffelen, [@tschoffelen](https://twitter.com/tschoffelen)
- César Jeanroy, [@cesar3030](https://github.com/cesar3030)



<br /><br />

---

<div align="center">
	<b>
		<a href="https://schof.co/consulting/?utm_source=flexible-agency/react-native-email-link">Get professional support for this package →</a>
	</b>
	<br>
	<sub>
		Custom consulting sessions availabe for implementation support or feature development.
	</sub>
</div>
