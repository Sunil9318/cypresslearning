import { Testrunner } from "@wdio/types/build/Options";
import {
  DesiredCapabilities,
  MultiRemoteCapabilities,
  W3CCapabilities,
} from "@wdio/types/build/Capabilities";

// This is a workaround for the fact that the Appium driver
// types are missing the `settings` capability.
// https://appium.io/docs/en/2.1/guides/settings/
interface ExtendedCapabilities extends DesiredCapabilities {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "appium:settings"?: {
    [setting: string]: unknown;
  };
}

export interface CustomTestrunner extends Testrunner {
  capabilities:
    | (ExtendedCapabilities | W3CCapabilities)[]
    | MultiRemoteCapabilities;
}

const defaultConfigs: Omit<Testrunner, "capabilities"> = {
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      project: "tsconfig.json",
    },
  },
  specs: ["./test/specs/**/*.ts"],
  exclude: [],
  maxInstances: 1,
  logLevel: "warn",
  baseUrl: "http://localhost",
  waitforTimeout: 30000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: [],
  framework: "jasmine",
  jasmineOpts: {
    defaultTimeoutInterval: 300000,
    stopOnSpecFailure: true,
  },
  onComplete: function (exitCode, _config, _capabilities, results) {
    if (exitCode === 0 && results.passed === 0) {
      throw new Error("At least one passing test is required.");
    }
  },
};

export { defaultConfigs };
