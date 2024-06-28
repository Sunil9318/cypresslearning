import { constants } from "../helpers/constants";

async function getLead() {
  return $(
    driver.isAndroid
      ? '//android.view.ViewGroup/android.view.View[contains(@text,"' +
          constants.CLIENT_FIRSTNAME +
          " " +
          constants.CLIENT_SECONDNAME +
          '")]'
      : "//XCUIElementTypeOther[contains(@name,'" +
          constants.CLIENT_FIRSTNAME +
          "')]",
  );
}

export const clientScreen = {
  getLead,
};
