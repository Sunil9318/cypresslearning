import Gestures from "../helpers/Gestures";
import { constants } from "../helpers/constants";
import { closeiOSKeyboardByClickingDone } from "../helpers/ios";
import { addClientScreen } from "./addClient.screen";
import { assignTeamScreen } from "./assignTeam.screen";
import { newInvoiceScreen } from "./newInvoice.screen";

const getAddClientButton = async () => {
  return $(driver.isAndroid ? "~Client" : "~SelectClientAndProperty");
};

const getFirstProperty = async () => {
  return $(
    driver.isAndroid
      ? '//android.widget.ScrollView[@content-desc="properties list"]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[1]'
      : '(//XCUIElementTypeOther[@name="listItem"])[1]',
  );
};

const getScheduleDateEnteredDate = async () => {
  return $(
    driver.isAndroid
      ? '//android.view.ViewGroup [contains(@content-desc,"Date")]/android.view.View'
      : "~inputPressableText",
  );
};

const getEnteredStartTimeField = async () => {
  return $(
    driver.isAndroid
      ? '//android.view.ViewGroup [contains(@content-desc,"Start")]/android.view.View'
      : '(//XCUIElementTypeOther[contains(@name,"inputPressableText")])[2]',
  );
};

const getJobTitleField = async () => {
  return $("~Job title input");
};
const getInstructionField = async () => {
  return $("~Instructions input");
};
async function getSearchClientField() {
  return $("~Search clients");
}

async function getLineItemsButton() {
  return $("~Line items");
}
const getFirstLineItem = async () => {
  return $(
    driver.isAndroid
      ? '//android.widget.ScrollView[@content-desc="Line Item List"]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[1]'
      : '(//XCUIElementTypeOther[@name="listItem"])[1]',
  );
};
const getAddToJobButton = async () => {
  return $("~Add to Job");
};
const getSaveLineItemButton = async () => {
  return $("id=Save Line Item");
};
const getSaveButton = async () => {
  return $("id=Save");
};
async function getSelectCurrentDate(date: string) {
  return $(
    driver.isAndroid
      ? `//android.widget.ToggleButton[@content-desc="${date}"]`
      : `//XCUIElementTypeButton[@name="${date}"]`,
  );
}
const getStartTime = async () => {
  return $(
    driver.isAndroid
      ? "id=ATL-InputFieldWrapper"
      : '(//XCUIElementTypeOther[@name="inputPressableText"])[1]',
  );
};
async function getTimeOkButton() {
  return $(driver.isAndroid ? "id=android:id/button1" : "~Confirm");
}
const getEndTime = async () => {
  return $(
    driver.isAndroid
      ? "*//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[4]"
      : '(//XCUIElementTypeOther[@name="inputPressableText"])[2]',
  );
};
async function getRepeatingField() {
  return $("id=ATL-components.RecurringScheduler.repeating-Select");
}
async function getDoesNotRepeatOption() {
  return $(
    driver.isAndroid
      ? "/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ListView/android.widget.CheckedTextView[1]"
      : "~Does not repeat",
  );
}
async function getDurationField() {
  return $(
    driver.isAndroid
      ? '//android.widget.EditText[@content-desc="Duration value input"]'
      : '//XCUIElementTypeTextField[@name="Duration value input"]',
  );
}
async function getInvoiceDurationField() {
  return $(
    driver.isAndroid
      ? '//android.widget.Button[contains(@content-desc,"Duration unit selector")]'
      : '(//XCUIElementTypeOther[@name="Duration unit selector"])[3]',
  );
}
async function getSelectMonthlyOption() {
  return $(
    driver.isAndroid
      ? "/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ListView/android.widget.CheckedTextView[3]"
      : "~Months",
  );
}

async function getSelectWeeklyOption() {
  return $(
    driver.isAndroid
      ? "/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ListView/android.widget.CheckedTextView[2]"
      : "~Weeks",
  );
}

async function getSelectInvoiceTypeField() {
  return $(
    driver.isAndroid
      ? '//android.widget.Button[@content-desc="How do you want to invoice?, For the work done each visit"]/android.view.ViewGroup'
      : '(//XCUIElementTypeOther[@name="How do you want to invoice?"])[3]',
  );
}
async function getSelectEachVisitOption() {
  return $(
    driver.isAndroid
      ? "/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ListView/android.widget.CheckedTextView[1]"
      : "id=For the work done each visit",
  );
}
async function getSelectInvoiceTimeField() {
  return $(
    driver.isAndroid
      ? '//android.widget.Button[@content-desc="Invoice period selector, The last day of every month"]/android.view.ViewGroup'
      : '(//XCUIElementTypeOther[@name="Invoice period selector"])[3]',
  );
}
async function getInvoiceTimeMonthlyOption() {
  return $(
    driver.isAndroid
      ? "/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ListView/android.widget.CheckedTextView[1]"
      : "id=The last day of every month",
  );
}
const getTeamButton = async () => {
  return $("~Team");
};

async function getToggleInvoice() {
  return $(
    driver.isAndroid
      ? '//android.widget.Switch[@content-desc="Remind me to invoice when I close the job"]'
      : '//XCUIElementTypeSwitch[@name="Remind me to invoice when I close the job"]',
  );
}
async function getSaveJobDetailsOption() {
  return $(
    driver.isAndroid ? "id=Save" : '//XCUIElementTypeButton[@name="Save"]',
  );
}
async function getEveryWeekOption() {
  const selector = 'label CONTAINS[cd] "Every week"';
  return $(
    driver.isAndroid
      ? "*//android.widget.ListView/android.widget.CheckedTextView[2]"
      : `-ios predicate string:${selector}`,
  );
}

async function getSelectRepeatOption() {
  return $(
    driver.isAndroid
      ? "/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ListView/android.widget.CheckedTextView[2]"
      : '//XCUIElementTypeButton[contains (@name,"Every week on")]',
  );
}

async function getDurationNumberField() {
  return $(
    driver.isAndroid
      ? "~Duration value input"
      : `//XCUIElementTypeTextField[@name="Duration value input"]`,
  );
}

async function getDurationUnitField() {
  const androidSelector =
    'new UiSelector().className("android.widget.Button")' +
    '.descriptionContains("unit selector")';
  const iosSelector =
    'label == "Duration unit selector" AND name == "ATL-Select"';
  return $(
    driver.isAndroid
      ? `android=${androidSelector}`
      : `-ios predicate string:${iosSelector}`,
  );
}

async function getDurationUnitMonth() {
  return $(
    driver.isAndroid
      ? '//android.widget.ListView/android.widget.CheckedTextView[3] [contains(@text,"Months")]'
      : "~Months",
  );
}

async function getHowToInvoiceField() {
  const iosSelector = '**/XCUIElementTypeButton[`label CONTAINS[cd] "How"`]';
  const androidSelector =
    'new UiSelector().className("android.widget.Button")' +
    '.descriptionContains("How")';
  return $(
    driver.isAndroid
      ? `android=${androidSelector}`
      : `-ios class chain:${iosSelector}`,
  );
}

async function getHowToInvoiceEachVisitOption() {
  return $(
    driver.isAndroid
      ? "*//android.widget.ListView/android.widget.CheckedTextView[1]"
      : "~For the work done each visit",
  );
}

async function getWhenToInvoiceField() {
  const iosSelector =
    'label CONTAINS[cd] "Invoice period" AND name == "ATL-Select"';
  const androidSelector =
    'new UiSelector().className("android.widget.Button")' +
    '.descriptionContains("period selector")';
  return $(
    driver.isAndroid
      ? `android=${androidSelector}`
      : `-ios predicate string:${iosSelector}`,
  );
}

async function getWhenToInvoiceLastDayEveryMonthOption() {
  return $(
    driver.isAndroid
      ? "*//android.widget.ListView/android.widget.CheckedTextView[1]"
      : "~The last day of every month",
  );
}

async function getUnitPriceField() {
  return $(
    driver.isAndroid
      ? "~Unit Price"
      : '(//XCUIElementTypeOther[@name="Unit Price Unit Price"])[2]',
  );
}

export const newJobScreen = {
  waitForAddClientButtonToBeDisplayed: async () => {
    await (await getAddClientButton()).waitForDisplayed();
  },

  getEnteredDate: async () => {
    const selectedDate = await getScheduleDateEnteredDate();
    const fullDate = await selectedDate.getText();
    const month = fullDate.substring(0, 3);
    const date = fullDate.substring(4, 6);
    return [month, date];
  },

  getEnteredStartTime: async () => {
    return (await getEnteredStartTimeField()).getText();
  },

  tapOnAddClientButton: async () => {
    await (await getAddClientButton()).click();
  },

  selectProperty: async () => {
    const locator = driver.isAndroid
      ? '//android.widget.Button[@content-desc="Property"]//*[@resource-id="add"]'
      : "//XCUIElementTypeOther[@name='Property']";

    const propertylist = await driver.findElements("xpath", locator);
    if (propertylist.length > 0) {
      await $(locator).waitForDisplayed({
        timeout: constants.PAGE_TRANSITION_TIME,
      });
      (await $(locator)).click;
      await (await getFirstProperty()).click();
    }
  },

  enterJobTitle: async () => {
    const jobTitle = await getJobTitleField();
    await jobTitle.waitForDisplayed();
    await jobTitle.click();
    await jobTitle.setValue(constants.JOB_TITLE_TEXT);
    driver.isAndroid
      ? await driver.hideKeyboard()
      : await closeiOSKeyboardByClickingDone();
  },

  enterInstructions: async () => {
    const instructionField = await getInstructionField();
    await instructionField.waitForDisplayed();
    await instructionField.click();
    await instructionField.setValue(constants.JOB_INSTRUCTION_TEXT);
    driver.isAndroid
      ? await driver.hideKeyboard()
      : await closeiOSKeyboardByClickingDone();
  },

  tapLineItemButton: async () => {
    const lineItemClick = await getLineItemsButton();
    await lineItemClick.waitForDisplayed();
    await lineItemClick.click();
  },

  selectLineItems: async () => {
    const lineItem = await getFirstLineItem();
    await lineItem.waitForDisplayed();
    await lineItem.click();
  },

  tapAddToJobButton: async () => {
    await (await getAddToJobButton()).click();
  },

  saveLineItem: async () => {
    const unitPriceField = await getUnitPriceField();
    await unitPriceField.waitForDisplayed();
    await unitPriceField.click();
    await unitPriceField.setValue(constants.LINE_ITEM_UNIT_PRICE);
    await (await getSaveLineItemButton()).click();
  },

  selectDateFromCalendar: async () => {
    if (driver.isAndroid) {
      await (await getLineItemsButton()).waitForDisplayed();
    }
    await Gestures.swipeUp(1);
    const tomorrow = new Date();
    const today = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    today.setDate(today.getDate());
    const tomorrowsDate = `${tomorrow.toLocaleString("en-US", {
      month: "long",
    })} ${String(tomorrow.getDate()).padStart(
      2,
      "0",
    )} ${tomorrow.getFullYear()}`;
    const todaysDate = `${today.toLocaleString("en-US", {
      month: "long",
    })} ${String(today.getDate()).padStart(2, "0")} ${today.getFullYear()}`;
    const dateToBeSelectedIsToday = await getSelectCurrentDate(todaysDate);
    const dateSelectedIsTomorrow = await getSelectCurrentDate(tomorrowsDate);

    if (driver.isIOS) {
      if ((await dateToBeSelectedIsToday.getAttribute("value")) !== "1") {
        if ((await dateSelectedIsTomorrow.getAttribute("value")) === "1") {
          await dateSelectedIsTomorrow.click();
          await dateToBeSelectedIsToday.click();
        } else {
          await dateToBeSelectedIsToday.click();
        }
      }
    }

    if (driver.isAndroid) {
      if ((await dateToBeSelectedIsToday.getAttribute("selected")) !== "true") {
        if (
          (await dateSelectedIsTomorrow.getAttribute("selected")) === "true"
        ) {
          await dateSelectedIsTomorrow.click();
          await dateToBeSelectedIsToday.click();
        } else {
          await dateToBeSelectedIsToday.click();
        }
      }
    }
  },

  selectStartTime: async () => {
    const startTime = await getStartTime();
    await startTime.click();
    await (await getTimeOkButton()).click();
  },

  selectEndTime: async () => {
    await (await getEndTime()).click();
    await (await getTimeOkButton()).click();
  },

  selectDoesNotRepeatOption: async () => {
    await Gestures.swipeUp(1);
    await (await getRepeatingField()).click();
    await (await getDoesNotRepeatOption()).click();
  },

  selectRepeatOption: async () => {
    await (await getRepeatingField()).click();
    await (await getSelectRepeatOption()).click();
  },

  selectDuration: async (durationNumber) => {
    const duration = await getDurationField();
    await Gestures.checkIfDisplayedWithSwipeUp(duration, 2);
    await duration.click();
    await duration.clearValue();
    await duration.setValue(durationNumber);
    driver.isAndroid
      ? await driver.hideKeyboard()
      : await closeiOSKeyboardByClickingDone();
  },

  selectInvoiceDurationMonthly: async () => {
    await (await getInvoiceDurationField()).click();
    await (await getSelectMonthlyOption()).click();
  },

  selectInvoiceDurationWeekly: async () => {
    await (await getInvoiceDurationField()).click();
    await (await getSelectWeeklyOption()).click();
  },

  selectInvoiceType: async () => {
    await (await getSelectInvoiceTypeField()).click();
    await (await getSelectEachVisitOption()).click();
  },
  selectInvoiceTime: async () => {
    await (await getSelectInvoiceTimeField()).click();
    await (await getInvoiceTimeMonthlyOption()).click();
  },

  tapOnTeamButton: async () => {
    await Gestures.swipeUp(1);
    await (await getTeamButton()).click();
  },

  isRemindMeEnabled: async () => {
    const toggleInvoice = await getToggleInvoice();
    await Gestures.checkIfDisplayedWithSwipeUp(toggleInvoice, 5);
    if (driver.isAndroid) {
      const isChecked = await toggleInvoice.getAttribute("checked");
      return isChecked === "true";
    } else {
      return Number(await toggleInvoice.getAttribute("value")) == 1;
    }
  },

  toggleRemindMe: async (desiredState: boolean) => {
    const currentState = await newJobScreen.isRemindMeEnabled();
    if (desiredState === currentState) {
      return;
    }
    await (await getToggleInvoice()).click();
  },

  saveJob: async () => {
    const saveJob = await getSaveJobDetailsOption();
    await saveJob.click();
  },

  scheduleRecurringJob: async (
    options: "days" | "weeks" | "months" | "years",
  ) => {
    switch (options) {
      case "days": {
        break;
      }

      case "weeks": {
        await newJobScreen.selectRepeatOption();
        await newJobScreen.selectDuration(10);
        await newJobScreen.selectInvoiceDurationWeekly();
        await newJobScreen.tapOnTeamButton();
        await assignTeamScreen.selectAndSaveTeam();
        await newJobScreen.selectInvoiceType();
        await newJobScreen.selectInvoiceTime();
        break;
      }
      case "months": {
        await newJobScreen.selectRepeatOption();
        await newJobScreen.selectDuration(6);
        await newJobScreen.selectInvoiceDurationMonthly();
        await newJobScreen.tapOnTeamButton();
        await assignTeamScreen.selectAndSaveTeam();
        await newJobScreen.selectInvoiceType();
        await newJobScreen.selectInvoiceTime();
        break;
      }
      case "years": {
        break;
      }
    }
  },

  addClient: async () => {
    await newJobScreen.waitForAddClientButtonToBeDisplayed();
    await newJobScreen.tapOnAddClientButton();
    await addClientScreen.selectFirstClientInSearchList();
    await newJobScreen.selectProperty();
  },

  scheduleJob: async (
    options: "one-off" | "repeating" | "repeating-monthly",
  ) => {
    await newJobScreen.enterJobTitle();
    await newJobScreen.enterInstructions();

    await newJobScreen.tapLineItemButton();
    await newJobScreen.selectLineItems();
    await newJobScreen.tapAddToJobButton();
    await newInvoiceScreen.tapSaveLineItemButton();

    await newJobScreen.selectDateFromCalendar();
    await newJobScreen.selectStartTime();
    await newJobScreen.selectEndTime();

    switch (options) {
      case "one-off": {
        await newJobScreen.selectDoesNotRepeatOption();
        await newJobScreen.tapOnTeamButton();
        await assignTeamScreen.selectAndSaveTeam();
        await newJobScreen.toggleRemindMe(true);
        break;
      }
      case "repeating": {
        await newJobScreen.scheduleRecurringJob("weeks");
        break;
      }
      case "repeating-monthly": {
        await newJobScreen.scheduleRecurringJob("months");
      }
    }
    await newJobScreen.saveJob();
  },

  quoteScheduleJob: async (
    options: "schedule-one-off" | "schedule-repeating",
  ) => {
    await newJobScreen.enterInstructions();

    await newJobScreen.selectDateFromCalendar();
    await newJobScreen.selectStartTime();
    await newJobScreen.selectEndTime();

    switch (options) {
      case "schedule-one-off": {
        await newJobScreen.selectDoesNotRepeatOption();
        await newJobScreen.tapOnTeamButton();
        await assignTeamScreen.selectAndSaveTeam();
        await newJobScreen.toggleRemindMe(true);
        break;
      }
      case "schedule-repeating": {
        await newJobScreen.scheduleRecurringJob("weeks");
      }
    }
    await newJobScreen.saveJob();
  },
};
