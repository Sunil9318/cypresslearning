import { constants } from "../helpers/constants";
import { allowLocationPermissionOnceIfDisplayed } from "../helpers/locationPrompt";

async function getClockInButton() {
  return $("id=ATL-clockIn-Button");
}

async function getClockOutButton() {
  return $("id=ATL-clockOut-Button");
}

export const timesheetScreen = {
  getClockInButton,
  tapClockInButton: async () => {
    const clockInButton = await getClockInButton();
    await clockInButton.waitForDisplayed({
      timeout: constants.ELEMENT_LOAD_TIME,
    });
    await clockInButton.click();
  },
  tapOnAllowOnceLocationPermission: async () => {
    await allowLocationPermissionOnceIfDisplayed();
  },
  tapClockOutButton: async () => {
    const clockOutButton = await getClockOutButton();
    await clockOutButton.waitForDisplayed({
      timeout: constants.CLOCK_IN_TIMER,
    });
    await clockOutButton.click();
  },
};
