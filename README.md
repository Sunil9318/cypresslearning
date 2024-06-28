# Appium

Appium e2e testings

## Prerequisites

1. node version 18.16.0
1. npm version 9.6.4
1. iOS app built for simulator in Xcode
1. Android app built in localRelease mode
1. Run `npm run init:overridefile` first, to create a blank override file, so that you can infuse different constant values for the test runner.

## Initial Setup

1. Install Appium deps
   - `npm i` inside `/appium`
1. Your host machine is ready for iOS and Android mobile development
   - Latest Xcode, iOS Simulator 16.4
     - xcode-select is also needed, install it with `xcode-select --install`
   - Android Studio, sdk, and java jdk all setup and referenced accordingly
   - [Jobber Mobile Guide](https://jobber.atlassian.net/wiki/spaces/JTW/pages/1007551465/Setting+up+Your+Mobile+Development+Environment)
1. You have **no red** `x` marks when running `npm run doctor` (yellow warnings are fine)

## Android Emulator quick start:

1. Ensure you have an Android Emulator running Android 13
1. Start appium server
   - `npm run start`
1. Running tests (emulator should be opened):
   - `npm run test:android` to run whole test suite
   - `npm run test:android -- --spec path/to/sometest.e2e.ts` to run a single file
1. Observe results from console

## iOS Simulator quick start:

1. Ensure you are running latest Xcode and have a simulator named "iPhone 14 Pro"
1. Start appium server
   - `npm run start`
1. Running tests (simulator will automatically open if not opened yet):
   - `npm run test:ios` to run whole test suite
   - `npm run test:ios -- --spec path/to/sometest.e2e.ts` to run a single file
1. Observe results from console

### iOS Simulator troubleshooting:

If for whatever reason you do not see a companion app installed into your Simulator (`WebDriverAgent`) or it's not working as expected, please try the following option as an altertive:

1. `rm -rf ~/Library/Developer/Xcode/DerivedData`
1. Close and reopen simulator
1. Restart server with `npm run start`
1. Run test suite again
1. As the test kicked off, if you are not seeing a blank app icon named `WebDriverAgent`, simply run `npm run doctor` and it will perform the installation to the Simulator for you

## General tips:

- When switching the binary, make sure that you remove the previous installed version from your emulatore/simulator before using the new one. Appium does some kind of caching and even deleting the previous version from your machine, it keeps installing the old app/apk;
- The recommended way to find selectors for your tests is using [Appium Inspector](https://github.com/appium/appium-inspector);

## Golden Example

| Example                                | Type |
| -------------------------------------- | ---- |
| [LoginFlow](./specs/login_flow.e2e.ts) | Spec |
