import { constants } from "../helpers/constants";
import Gestures from "../helpers/Gestures";
import { closeKeyboard } from "../helpers/utils";
import { addClientScreen } from "./addClient.screen";

const getAddClientButton = async () => {
  return $("~Client");
};

async function getLineItemsButton() {
  return $("~Line items");
}

const getLineItemInList = async (lineItemNumber: number) => {
  return $(
    driver.isAndroid
      ? '//android.widget.ScrollView[@content-desc="Line Item List"]/android.view.ViewGroup' +
          "/android.view.ViewGroup/android.view.ViewGroup[" +
          lineItemNumber +
          "]" +
          "/android.view.ViewGroup[1]"
      : '(//XCUIElementTypeOther[@name="listItem"])[' + lineItemNumber + "]",
  );
};

const getAddToInvoiceButton = async () => {
  return $("id=Add to Invoice");
};

const getSaveLineItemButton = async () => {
  return $("id=Save Line Item");
};

const getSaveButton = async () => {
  return $("id=Save");
};

async function getUnitPriceField() {
  return $(
    driver.isAndroid
      ? "~Unit Price"
      : '//XCUIElementTypeTextField[@name="Unit Price"]',
  );
}

export const newInvoiceScreen = {
  waitForAddClientButtonToBeDisplayed: async () => {
    await (await getAddClientButton()).waitForDisplayed();
  },

  selectClient: async () => {
    await (await getAddClientButton()).click();
    await addClientScreen.selectFirstClientInSearchList();
  },

  tapLineItemButton: async () => {
    const lineItemButton = await getLineItemsButton();
    await lineItemButton.waitForDisplayed();
    await lineItemButton.click();
  },
  selectLineItem: async (item = 9) => {
    await (await getLineItemInList(item)).click();
  },

  tapAddToInvoiceButton: async () => {
    const addInvoiceButton = await getAddToInvoiceButton();
    await addInvoiceButton.waitForDisplayed();
    await addInvoiceButton.click();
  },

  tapSaveLineItemButton: async () => {
    const unitPriceField = await getUnitPriceField();
    await unitPriceField.click();
    await unitPriceField.setValue(constants.LINE_ITEM_UNIT_PRICE);
    await (await getSaveLineItemButton()).click();
  },

  tapSaveButton: async () => {
    if (driver.isAndroid) {
      await (await getLineItemsButton()).waitForDisplayed();
    }
    await Gestures.swipeUp(1);
    const saveButton = await getSaveButton();
    await saveButton.waitForDisplayed();
    await saveButton.click();
  },
};
