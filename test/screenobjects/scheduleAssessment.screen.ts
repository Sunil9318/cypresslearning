import { constants } from "../helpers/constants";
import { closeKeyboard } from "../helpers/utils";

async function getInstructionsField() {
  return $("~Instructions");
}

const getDateScheduleField = async () => {
  return $(
    driver.isAndroid
      ? "~Date, Unscheduled"
      : '(//XCUIElementTypeOther[@name="Date Date"])[1]',
  );
};

const getOkButtonDatePicker = async () => {
  return $(
    driver.isAndroid
      ? "/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout" +
          "/android.widget.FrameLayout/android.widget.LinearLayout" +
          "/android.widget.ScrollView/android.widget.LinearLayout/android.widget.Button[2]"
      : "~Confirm",
  );
};

const getTimeEntryField = async () => {
  return $(
    driver.isAndroid
      ? "~Time, Anytime"
      : '(//XCUIElementTypeOther[@name="Time Time"])[3]',
  );
};

const getOkButtonTimePicker = async () => {
  return $(
    driver.isAndroid
      ? "/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout" +
          "/android.widget.FrameLayout/android.widget.LinearLayout" +
          "/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.TimePicker" +
          "/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.ScrollView" +
          "/android.widget.LinearLayout/android.widget.Button[2]"
      : "~Confirm",
  );
};

const getTeamSelectionField = async () => {
  return $(driver.isAndroid ? "~Team" : "~actionItem");
};

async function getSaveAssessmentButton() {
  return $("id=Save Assessment");
}

export const scheduleAssessmentScreen = {
  enterInstructions: async () => {
    const instructionsField = await getInstructionsField();
    await instructionsField.click();
    await instructionsField.setValue(constants.INSTRUCTIONS_TEXT);
    await closeKeyboard();
  },
  enterDate: async () => {
    await (await getDateScheduleField()).click();
    await (await getOkButtonDatePicker()).click();
  },
  enterTime: async () => {
    await (await getTimeEntryField()).click();
    const okButton = await getOkButtonTimePicker();
    await okButton.waitForDisplayed();
    await okButton.click();
  },
  tapOnTeamSelectionButton: async () => {
    await (await getTeamSelectionField()).click();
  },

  saveAssessment: async () => {
    const saveAssessment = await getSaveAssessmentButton();
    await saveAssessment.waitForDisplayed();
    await saveAssessment.click();
  },
};
