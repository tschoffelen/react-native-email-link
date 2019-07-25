# React Native Email Link

An easy way to open an email app of the user's choice, based on the apps they have installed
on their device.

Currently supported apps:

* Apple Mail
* Gmail
* Inbox
* Spark
* Airmail
* Outlook


## Installation

```
npm i -S react-native-email-link       # or yarn add react-native-email-link
```

This package works with autolinking on RN>=0.60. If you're using an earlier version of React Native, please install version `1.4.0` of the library, or
check out the legacy [rnpm](https://github.com/leanmotherfuckers/react-native-email-link/tree/rnpm) branch.

### A note about iOS 9+
As of iOS 9, your app needs to provide the `LSApplicationQueriesSchemes` key inside
Info.plist to specify the URL schemes with which the app can interact.

Just put this in your Info.plist depending on which apps you'd like to support.
Omitting these might mean that the library can't detect some of the mail apps installed by the user.

```
<key>LSApplicationQueriesSchemes</key>
<array>
    <string>message</string>
    <string>readdle-spark</string>
    <string>airmail</string>
    <string>ms-outlook</string>
    <string>googlegmail</string>
    <string>inbox-gmail</string>
</array>
```

## Usage

```
import { openInbox } from 'react-native-email-link'

openInbox()
```

## Arguments

- [`title`](#title)
- [`message`](#message)
- [`cancelLabel`](#cancelLabel)
- [`removeText`](#removeText)

### `title`

Text for the top of the ActionSheet or Intent.

| Type     | Required | Default         |
| -------- | -------- | --------------- |
| string   | No       | 'Open mail app' |

### `message`

Subtext under the title on the ActionSheet

| Type     | Required | Default                             | Platform |
| -------- | -------- | ----------------------------------- | -------- |
| string   | No       | 'Which app would you like to open?' | iOS      |

### `cancelLabel`

Text for last button of the ActionSheet.

| Type     | Required | Default   | Platform |
| -------- | -------- | --------- | -------- |
| string   | No       | 'Cancel'  | iOS      |

### `removeText`

If true, not text will be show above the ActionSheet or Intent. Default value is false.

| Type     | Required | Default  |
| -------- | -------- | -------- |
| boolean  | No       | false    |


## Authors

This library is developed by [Lean Motherfuckers](https://leanmotherfuckers.com/), a tech consulting
company like no other.

Contributors:

* Thomas Schoffelen, [@tschoffelen](https://twitter.com/tschoffelen)
