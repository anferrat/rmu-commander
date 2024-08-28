This is **UNOFFICIAL** client for corview.cloud web application for mobile devices.

## Stack

React-Native 0.74.3 + TypeScript

Redux + Toolkit

UI Kitten

react-native-quick-crypto for PKCE code geneartion

rn-secure-storage, op-sqlite, axios


## Usage

RMU commander allows to send On/Of/ContinuousInterruption commands to Mobiltex's Remote Monitoring Units (works with RMU3).


## Features
 - **Fast and simple** - quick and reliable way to send comands from the device in field.
 - **Auto-login and Save password** - login once and have your credentials stored on device in encrypted storage.
 - **No more "Send Verification e-mail"** - seriously, it is annoying...
 - **Save interruption configurations** - create configurations with On/Off cycles and use them to send interruption commands, without entering cycle time every time.
 - **Adaptive time selection** - select desired duration of interruption instead of typing start and end dates.

## Limitations

- Only supporting Continuous Interruption, Turn On and Turn Off commands.
- You can only send commands and see site and command status updates. To view full data use the official web app.