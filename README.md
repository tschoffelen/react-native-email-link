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
npm i -S react-native-email-link         # or yarn add react-native-email-link
```

Afterwards do:

```
react-native link react-native-email-link
```

Linking is only necessary for Android, you might see an error on simulator, try it on real device.

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


## Authors

This library is developed by [Includable](https://includable.com/), a creative app and web platform
development agency based in Amsterdam, The Netherlands.

* Thomas Schoffelen, [@tschoffelen](https://twitter.com/tschoffelen)
