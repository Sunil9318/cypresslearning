import path from "path";
import { defaultConfigs, CustomTestrunner } from "./wdio.conf";

function getAppPath() {
  return path.resolve(__dirname, "bin/Jobber.apk");
}

function getTestOutputDir() {
  const logDir = process.env.DEVICEFARM_LOG_DIR || ".";
  return `${logDir}/test-output`;
}

// ====================
// Runner Configuration
// ====================
// See `wdio.conf.ts.sample` for a commented example
const config: CustomTestrunner = {
  ...defaultConfigs,
  capabilities: [
    {
      port: 4723,
      path: "/wd/hub",
      /* eslint-disable @typescript-eslint/naming-convention */
      "appium:platformName": "Android",
      "appium:platformVersion": "13",
      "appium:app": getAppPath(),
      "appium:automationName": "UiAutomator2",
      "appium:settings": {
        disableIdLocatorAutocompletion: true,
      },
      maxInstances: 1,
      browserName: "",
      "appium:newCommandTimeout": 180000,
      /* eslint-enable @typescript-eslint/naming-convention */
    },
  ],
  reporters: [
    [
      "spec",
      {
        showPreface: false,
      },
    ],
    [
      "junit",
      {
        outputDir: getTestOutputDir(),
        outputFileFormat: function (_) {
          return "junit.xml";
        },
      },
    ],
    [
      "json",
      {
        outputDir: getTestOutputDir(),
        outputFileFormat: function (_) {
          return "results.json";
        },
      },
    ],
  ],
};

module.exports.config = config;
