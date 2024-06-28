import { constants } from "../helpers/constants";

async function getLead() {
  return $(
    driver.isAndroid
      ? '(//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.View[contains(@text,"Request for ' +
          constants.CLIENT_FIRSTNAME +
          " " +
          constants.CLIENT_SECONDNAME +
          '")])[1]'
      : '(//XCUIElementTypeOther[@name="Request for ' +
          constants.CLIENT_FIRSTNAME +
          " " +
          constants.CLIENT_SECONDNAME +
          '"])[2]',
  );
}
async function getConvertToQuoteButton() {
  return $(
    driver.isAndroid
      ? '//android.widget.Button[@content-desc="Convert to Quote"]/android.view.ViewGroup'
      : "~Convert to Quote",
  );
}

const getCompleteAssessmentButton = async () => {
  return $(
    driver.isAndroid ? "~Complete Assessment" : "id=Complete Assessment",
  );
};
const getCompleteButton = async () => {
  return $("~Completed");
};
const allowLocationPermissionOnce = async () => {
  return $(
    driver.isAndroid
      ? '(*//android.widget.LinearLayout[3]/android.widget.Button[2] )[contains(@text,"Only this time")]'
      : "~Allow Once",
  );
};

const getMoreButton = async () => {
  return $(driver.isAndroid ? "id=more" : "~More");
};

const getDeleteButton = async () => {
  return $("~Delete");
};

const getDeleteButtonPopup = async () => {
  return $(driver.isAndroid ? "id=android:id/button1" : "~Delete");
};

async function getConvertToJobButton() {
  return $(
    driver.isAndroid
      ? '//android.view.ViewGroup[@content-desc="Convert to Job"]'
      : "~Convert to Job",
  );
}

export const requestScreen = {
  getLead,
  getCompleteButton,
  tapConvertToQuoteButton: async () => {
    const convertToQuoteButton = await getConvertToQuoteButton();
    await convertToQuoteButton.waitForDisplayed();
    return convertToQuoteButton.click();
  },

  tapOnCompleteAssessmentButton: async () => {
    const completeTaskButton = await getCompleteAssessmentButton();
    await completeTaskButton.waitForDisplayed();
    await completeTaskButton.click();
    const allowPermissionOnce = await allowLocationPermissionOnce();
    if (await allowPermissionOnce.isDisplayed()) {
      await allowPermissionOnce.click();
    }
  },

  tapMoreButton: async () => {
    const moreButton = await getMoreButton();
    await moreButton.waitForDisplayed();
    return moreButton.click();
  },
  tapDeleteButton: async () => {
    const deleteButton = await getDeleteButton();
    await deleteButton.waitForDisplayed({
      timeout: constants.ELEMENT_LOAD_TIME,
    });
    await deleteButton.click();
  },
  tapDeleteButtonPopup: async () => {
    const deleteButtonPopup = await getDeleteButtonPopup();
    await deleteButtonPopup.waitForDisplayed();
    await deleteButtonPopup.click();
  },
  tapConvertToJobButton: async () => {
    await requestScreen.tapMoreButton();
    const convertToJobButton = await getConvertToJobButton();
    await convertToJobButton.waitForDisplayed();
    await convertToJobButton.click();
  },
};
