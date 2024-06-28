import Gestures from "../helpers/Gestures";
import { constants } from "../helpers/constants";
import { closeiOSKeyboardByClickingDone } from "../helpers/ios";
import { closeKeyboard } from "../helpers/utils";

const getAddClientButton = async () => {
  return $(driver.isAndroid ? "~Client" : "~SelectClientAndProperty");
};

const getRequestTitleField = async () => {
  return $(
    driver.isAndroid
      ? "~Request title"
      : '(//XCUIElementTypeOther[@name="Request title"])[1]',
  );
};

async function getScheduleButton() {
  return $("~Schedule");
}

async function getSaveRequestButton() {
  return $("id=Save Request");
}

const getTimeDatePlaceholderField = async () => {
  return $(
    driver.isAndroid
      ? '//android.widget.EditText[contains(@resource-id,"AssessmentInstructionsInput")]/parent::android.view.ViewGroup/following-sibling::android.widget.Button'
      : '(//XCUIElementTypeButton[@name="actionItem"])[3]',
  );
};

async function getInstructionsField() {
  return $("~Instructions");
}

const getTeamButton = async () => {
  return $("~Team");
};

export const newRequestScreen = {
  waitForAddClientButtonToBeDisplayedAndTap: async () => {
    const addClientButton = await getAddClientButton();
    await addClientButton.waitForDisplayed();
    await addClientButton.click();
  },

  enterRequestTitle: async () => {
    const requestTitle = await getRequestTitleField();
    await requestTitle.waitForDisplayed();
    await requestTitle.click();
    await requestTitle.setValue(constants.REQUEST_TITLE_TEXT);
    driver.isAndroid
      ? await driver.pressKeyCode(4)
      : await closeiOSKeyboardByClickingDone();
  },
  tapScheduleButton: async () => {
    await (await getScheduleButton()).click();
  },

  saveRequest: async () => {
    if (driver.isAndroid) {
      await (await getRequestTitleField()).waitForDisplayed();
      await Gestures.swipeUp(1);
    }
    const saveRequestButton = await getSaveRequestButton();
    await saveRequestButton.waitForDisplayed();
    await saveRequestButton.click();
    await driver.setImplicitTimeout(2000);
  },

  getDateTimePlaceholderText: async () => {
    const timeDateText = await getTimeDatePlaceholderField();
    await timeDateText.waitForDisplayed();
    const placeholderText = await timeDateText.getText();
    const month = placeholderText.substring(0, 3);
    const date = placeholderText.substring(4, 6);
    const startTime = placeholderText.substring(8, 16);
    return [month, date, startTime];
  },

  enterInstructions: async () => {
    const instructionsField = await getInstructionsField();
    await instructionsField.setValue(constants.INSTRUCTIONS_TEXT);
    await closeKeyboard();
    await Gestures.swipeUp(0.5);
  },
  tapOnTeamButton: async () => {
    await (await getTeamButton()).click();
  },
};
