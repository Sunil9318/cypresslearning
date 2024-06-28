import Gestures from "../helpers/Gestures";
import { constants } from "../helpers/constants";
import { addClientScreen } from "./addClient.screen";
import { closeKeyboard } from "../helpers/utils";

const getAddClientButton = async () => {
  return $("id=SelectClientAndProperty");
};

const getTitleField = async () => {
  return $("id=features.Task.components.TitleAndDescription.title");
};
async function getDescriptionField() {
  return $("id=features.Task.components.TitleAndDescription.description");
}

const getScheduleDate = async () => {
  return $("id=inputPressableText");
};

const getTeamButton = async () => {
  const teamButtonParent = await $(
    "id=components.AssignedTeamCard.assignTeamCardA11YLabel",
  );

  return teamButtonParent.$$("/*")[0];
};

const getDateOkButton = async () => {
  return $(
    driver.isAndroid
      ? "id=android:id/button1"
      : "-ios class chain:**/XCUIElementTypeButton[2]",
  );
};

const getTime = async () => {
  return $$("id=inputPressableText")[1];
};

async function getTimeOkButton() {
  return $(
    driver.isAndroid
      ? "id=android:id/button1"
      : "-ios class chain:**/XCUIElementTypeButton[2]",
  );
}
async function getRepeatingField() {
  return $("id=ATL-components.RecurringScheduler.repeating-Select");
}
async function getDoesNotRepeatOption() {
  return $(
    driver.isAndroid
      ? "id=android:id/text1"
      : "//XCUIElementTypeCollectionView/XCUIElementTypeCell[1]",
  );
}

async function getSaveTaskButton() {
  return $("id=Save");
}

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

export const newTaskScreen = {
  tapOnAddClientButton: async () => {
    await (await getAddClientButton()).click();
  },

  selectClient: async () => {
    await addClientScreen.selectFirstClientInSearchList();
  },

  enterTitle: async () => {
    const titleField = await getTitleField();
    await titleField.click();
    await titleField.setValue(constants.TASK_TITLE);
    await closeKeyboard();
  },
  enterDescription: async () => {
    await (await getDescriptionField()).setValue(constants.TASK_DESCRIPTION);
  },

  enterDate: async () => {
    await (await getScheduleDate()).click();
    await (await getDateOkButton()).click();
  },
  enterTime: async () => {
    await (await getTime()).click();
    await (await getTimeOkButton()).click();
  },

  selectDoesNotRepeatOption: async () => {
    await (await getRepeatingField()).click();
    await (await getDoesNotRepeatOption()).click();
  },
  tapOnTeamButton: async () => {
    await Gestures.swipeUp(0.9);
    await (await getTeamButton()).click();
  },

  saveTask: async () => {
    if (driver.isAndroid) {
      await (await getTeamButton()).waitForDisplayed();
      await Gestures.swipeUp(1);
    }
    await (await getSaveTaskButton()).click();
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
};
