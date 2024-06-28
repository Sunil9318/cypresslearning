import { constants } from "../helpers/constants";
import { allowLocationPermissionOnceIfDisplayed } from "../helpers/locationPrompt";

const getStartTimerButton = async () => {
  return $("id=Start Timer");
};

const getStopTimerButton = async () => {
  return $("id=Stop Timer");
};

const getCompleteVisitButton = async () => {
  return $("id=Complete Visit");
};
const getInvoiceLaterButton = async () => {
  return $(
    driver.isAndroid
      ? "id=invoiceLater"
      : "//XCUIElementTypeOther[@name='Close Job & Invoice Later']",
  );
};
const getMoreButton = async () => {
  return $(
    driver.isAndroid ? "id=more" : "//XCUIElementTypeButton[@name='More']",
  );
};
const getDeleteVisitButton = async () => {
  return $(
    driver.isAndroid
      ? "//android.view.ViewGroup[@content-desc='Delete Visit']"
      : "~Delete Visit",
  );
};
const getDeleteButtonInPopup = async () => {
  return $(driver.isAndroid ? "id=android:id/button1" : "~Delete");
};

const getCompletedButton = async () => {
  return $("id=Completed");
};
const getTryLocationTimersButton = async () => {
  return $("id=Try Location Timers");
};
const getBackButton = async () => {
  return $(
    driver.isAndroid ? "~Back" : '//XCUIElementTypeButton[@name="Back"]',
  );
};

const getVisitButtonClick = async () => {
  return $("~Go to Visits");
};

const getRecurringJobFromList = async () => {
  return $(
    driver.isAndroid
      ? '//android.view.ViewGroup[@content-desc="Visits"]/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[1]'
      : '//XCUIElementTypeOther[@name="Schedule Start date Arrival window Repeating Visits"]',
  );
};

const getInvoiceNowButton = async () => {
  return $("id=invoice");
};

export const visitScreen = {
  getCompletedButton,
  getStartTimerButton,
  tapOnStartTimerButton: async () => {
    const startTimerButton = await getStartTimerButton();
    await startTimerButton.waitForDisplayed();
    await startTimerButton.click();
    await driver.pause(2000);
    await allowLocationPermissionOnceIfDisplayed();
  },

  tapOnTryLocationTimersButton: async () => {
    const tryLocationTimersButton = await getTryLocationTimersButton();
    if (await tryLocationTimersButton.isDisplayed()) {
      await tryLocationTimersButton.click();
    }
  },
  tapOnBackButton: async () => {
    const backButton = await getBackButton();
    if (await backButton.isDisplayed()) {
      await backButton.click();
    }
  },

  tapOnStopTimerButton: async () => {
    const stopTimerButton = await getStopTimerButton();
    await stopTimerButton.waitForDisplayed();
    await stopTimerButton.click();
  },

  tapOnCompleteVisitButton: async () => {
    const completeVisitButton = await getCompleteVisitButton();
    await completeVisitButton.waitForDisplayed();
    await completeVisitButton.click();
    await driver.pause(constants.ELEMENT_LOAD_TIME);
    await allowLocationPermissionOnceIfDisplayed();
  },
  tapOnInvoiceLaterButton: async () => {
    const invoiceLaterButton = await getInvoiceLaterButton();
    await invoiceLaterButton.waitForDisplayed();
    await invoiceLaterButton.click();
    await driver.pause(constants.ELEMENT_LOAD_TIME);
    await allowLocationPermissionOnceIfDisplayed();
  },
  tapOnMoreButton: async () => {
    const moreButton = await getMoreButton();
    await moreButton.waitForDisplayed();
    await moreButton.click();
  },
  tapOnDeleteVisitButton: async () => {
    const deleteVisitButton = await getDeleteVisitButton();
    await deleteVisitButton.waitForDisplayed();
    await deleteVisitButton.click();
  },
  tapDeleteButtonPopup: async () => {
    const deleteButtonPopup = await getDeleteButtonInPopup();
    await deleteButtonPopup.waitForDisplayed();
    await deleteButtonPopup.click();
  },
  deleteVisit: async () => {
    await visitScreen.tapOnMoreButton();
    await visitScreen.tapOnDeleteVisitButton();
    await visitScreen.tapDeleteButtonPopup();
  },
  tapOnGoToVisitButton: async () => {
    const visitButtonClick = await getVisitButtonClick();
    await visitButtonClick.click();
  },
  tapOnSelectJobFromList: async () => {
    const recurringJobClick = await getRecurringJobFromList();
    await recurringJobClick.click();
  },
  tapOnInvoiceNowButton: async () => {
    const InvoiceNowButton = await getInvoiceNowButton();
    await InvoiceNowButton.waitForDisplayed();
    await InvoiceNowButton.click();
    await allowLocationPermissionOnceIfDisplayed();
  },
};
