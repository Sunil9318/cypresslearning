import { constants } from "../helpers/constants";

async function getTaskTitle() {
  return $(
    driver.isAndroid
      ? '*//android.view.View[contains(@text,"' + constants.TASK_TITLE + '")]'
      : '(//XCUIElementTypeOther[@name="' + constants.TASK_TITLE + '"])[4]',
  );
}

const getCompleteTaskButton = async () => {
  return $("~Complete Task");
};

const getTaskCompleteButton = async () => {
  return $(
    driver.isAndroid
      ? '//android.widget.Button[@content-desc="Complete"]/android.view.ViewGroup'
      : "~Complete",
  );
};

const allowLocationPermissionOnce = async () => {
  return $(
    driver.isAndroid
      ? '(*//android.widget.LinearLayout[3]/android.widget.Button[2] )[contains(@text,"Only this time")]'
      : "~Allow Once",
  );
};

const getCheckmarkOnTaskTile = async () => {
  return $("~Complete Task");
};

const getMoreButton = async () => {
  return $("~More");
};

const getDeleteTaskOption = async () => {
  return $("~Delete Task");
};
const getDeleteButtonInPopup = async () => {
  return $(driver.isAndroid ? "id=android:id/button1" : "~Delete");
};

const getBackButton = async () => {
  return $('//XCUIElementTypeButton[@name="Back"]');
};

export const taskScreen = {
  getTaskTitle,
  getCompleteTaskButton,
  getTaskCompleteButton,

  tapOnCompleteTaskButton: async () => {
    const completeTaskButton = await getCompleteTaskButton();
    await completeTaskButton.waitForDisplayed();
    await completeTaskButton.click();
    const allowPermissionOnce = await allowLocationPermissionOnce();
    await allowPermissionOnce.waitForDisplayed();
    await allowPermissionOnce.click();
    driver.setImplicitTimeout(3000);
  },
  taskCheckmarkWaitForDisplayed: async () => {
    await (await getCheckmarkOnTaskTile()).waitForDisplayed();
  },
  tapMoreButton: async () => {
    await (await getMoreButton()).click();
  },
  tapDeleteTask: async () => {
    const deleteTaskButton = await getDeleteTaskOption();
    await deleteTaskButton.waitForDisplayed({
      timeout: constants.ELEMENT_LOAD_TIME,
    });
    await deleteTaskButton.click();
  },
  tapDeleteButtonPopup: async () => {
    const deleteButtonPopup = await getDeleteButtonInPopup();
    await deleteButtonPopup.waitForDisplayed();
    await deleteButtonPopup.click();
  },
  tapBackButton: async () => {
    await (await getBackButton()).click();
  },
};
