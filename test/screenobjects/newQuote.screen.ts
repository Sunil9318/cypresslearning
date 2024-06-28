import Gestures from "../helpers/Gestures";
import { constants } from "../helpers/constants";
import { addClientScreen } from "./addClient.screen";
import { closeKeyboard } from "../helpers/utils";

const getAddClientButton = async () => {
  return $(driver.isAndroid ? "~Client" : "~SelectClientAndProperty");
};

const getJobTitleField = async () => {
  return $("~Job title");
};
async function getLineItemsButton() {
  return $("~Line items");
}

const getLineItem = async (lineItemNumber) => {
  return $(
    driver.isAndroid
      ? '//android.widget.ScrollView[@content-desc="Line Item List"]/android.view.ViewGroup' +
          "/android.view.ViewGroup/android.view.ViewGroup[" +
          lineItemNumber +
          "]/android.view.ViewGroup[1]"
      : '(//XCUIElementTypeOther[@name="listItem"])[' + lineItemNumber + "]",
  );
};

const getAddToQuoteButton = async () => {
  return $("~Add to Quote");
};

const getSaveLineItemButton = async () => {
  return $("~Save Line Item");
};

const getSaveQuoteButton = async () => {
  return $("~Save Quote");
};

export const newQuoteScreen = {
  waitForAddClientButtonToBeDisplayed: async () => {
    return (await getAddClientButton()).waitForDisplayed();
  },
  tapOnAddClientButton: async () => {
    await (await getAddClientButton()).click();
  },

  selectFirstItemInClientSearchList: async () => {
    await addClientScreen.selectFirstClientInSearchList();
  },
  enterJobTitle: async () => {
    const jobTitle = await getJobTitleField();
    await jobTitle.waitForDisplayed();
    await jobTitle.click();
    await jobTitle.setValue(constants.JOB_TITLE_TEXT);
    await closeKeyboard();
  },
  tapLineItemButton: async () => {
    await (await getLineItemsButton()).click();
  },
  selectLineItems: async () => {
    const lineItem = await getLineItem(10);
    await lineItem.waitForDisplayed();
    await lineItem.click();
  },

  tapAddToQuoteButton: async () => {
    await (await getAddToQuoteButton()).click();
  },
  saveLineItem: async () => {
    await (await getSaveLineItemButton()).click();
  },

  tapOnSaveQuoteButton: async () => {
    if (driver.isAndroid) {
      await (await getJobTitleField()).waitForDisplayed();
      await Gestures.swipeUp(1);
    }
    await (await getSaveQuoteButton()).click();
  },
};
