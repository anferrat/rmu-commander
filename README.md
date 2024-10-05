# RMU commander

This is **UNOFFICIAL** client for corview.cloud web application for mobile devices.

## Stack

[React Native 0.74.3](https://github.com/facebook/react-native) + TypeScript

[Redux](https://github.com/reduxjs/redux) + [Toolkit](https://github.com/reduxjs/redux-toolkit)

[UI Kitten](https://github.com/akveo/react-native-ui-kitten)

[react-native-quick-crypto](https://github.com/margelo/react-native-quick-crypto) for PKCE code geneartion

[rn-secure-storage](https://github.com/talut/rn-secure-storage), [op-sqlite](https://github.com/OP-Engineering/op-sqlite), [axios](https://github.com/axios/axios)

## Download

Android apk file is available for download [here](https://github.com/anferrat/rmu-commander/releases/tag/v1.0.1)

Download from [Google Play Store](https://play.google.com/store/apps/details?id=com.corviewcommander)

## Usage

<img src='/assets/sh-1.png' width="200">

RMU commander allows to send On/Of/ContinuousInterruption commands to Mobiltex's Remote Monitoring Units (works with RMU3).


## Features
 - **Fast and simple** - quick and reliable way to send comands from the device in field.
 - **Auto-login and Save password** - login once and have your credentials stored on device in encrypted storage.
 - **No more "Send Verification e-mail"** - seriously, it is annoying...
 - **Save interruption configurations** - create configurations with On/Off cycles and use them to send interruption commands, without entering cycle time every time.
 - **Adaptive time selection** - select desired duration of interruption instead of typing start and end dates.

## Limitations

- Only supporting Continuous Interruption, Turn On and Turn Off commands.
- You can only send commands and see site and command status updates. To view full data use the [official](https://corview.cloud) web app.