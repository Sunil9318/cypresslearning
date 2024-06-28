import { constants } from "../helpers/constants";

async function getSelectedTime() {
  return $(
    driver.isAndroid
      ? "//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[2]" +
          "/android.view.ViewGroup[2]/android.view.ViewGroup[2]"
      : '//XCUIElementTypeOther[@name="dayViewScheduleColumn"]' +
          "/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther[2]",
  );
}
async function getNewJobPage() {
  return $(
    driver.isAndroid
      ? '//android.view.ViewGroup[@content-desc="New Job"]'
      : '//XCUIElementTypeOther[@name="New Job"]',
  );
}
const getTimeIndicator = async () => {
  return $("id=current-time-indicator");
};

const getTimeDateText = async () => {
  return $(
    driver.isAndroid
      ? "*//android.view.ViewGroup[2]/android.view.View"
      : '(//XCUIElementTypeOther[@name="New Job New Request Add Task"])[1]' +
          "/parent::XCUIElementTypeScrollView/parent::XCUIElementTypeOther" +
          "/parent::XCUIElementTypeOther/preceding-sibling::XCUIElementTypeOther",
  );
};

const getTaskTiles = async () => {
  const selector =
    "type == 'XCUIElementTypeOther' AND label BEGINSWITH[cd] '" +
    constants.TASK_TITLE +
    "' AND name CONTAINS[cd] 'scheduleItem'";

  return $(
    driver.isAndroid
      ? '//android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView [contains(@text,"' +
          constants.TASK_TITLE +
          '")]'
      : `-ios predicate string:${selector}`,
  );
};

const getCheckMarkOnTaskTile = async () => {
  return $("id=checkmark");
};

const getNewRequestOption = async () => {
  return $("~New Request");
};

const getRequestTiles = async () => {
  const selector =
    '**/XCUIElementTypeOther[`label BEGINSWITH "' +
    constants.REQUEST_TITLE_TEXT +
    "\" AND name CONTAINS[cd] 'scheduleItem'`]";

  return $(
    driver.isAndroid
      ? '//android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView [contains(@text,"' +
          constants.REQUEST_TITLE_TEXT +
          '")]'
      : `-ios class chain:${selector}`,
  );
};

const getUserTextAndroid = async () => {
  return $(
    "*//android.view.ViewGroup[4]/android.view.ViewGroup/android.view.ViewGroup" +
      "/android.view.ViewGroup/android.widget.TextView",
  );
};
const getJobTile = async () => {
  const selector =
    "type == 'XCUIElementTypeOther' AND label BEGINSWITH[cd] '" +
    constants.JOB_TITLE_TEXT +
    "' AND name CONTAINS[cd] 'scheduleItem'";

  return $(
    driver.isAndroid
      ? '//android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView [contains(@text,"' +
          constants.JOB_TITLE_TEXT +
          '")]'
      : `-ios predicate string:${selector}`,
  );
};

const getAddTaskOption = async () => {
  return $("~Add Task");
};

export const scheduleScreen = {
  getTaskTiles,
  getCheckMarkOnTaskTile,
  getTimeIndicator,
  getJobTile,
  tapOnTimerIndicator: async () => {
    const timeIndicator = await getTimeIndicator();
    if (driver.isAndroid) {
      const userText = await getUserTextAndroid();
      await userText.waitForExist();
      await userText.click();
    }
    await timeIndicator.waitForDisplayed({
      timeout: constants.PAGE_TRANSITION_TIME,
    });
    await timeIndicator.click();
  },
  getTimeDateValue: async () => {
    const timeDateElement = await getTimeDateText();
    await timeDateElement.waitForDisplayed();
    return timeDateElement.getText();
  },

  tapOnNewRequestOption: async () => {
    await (await getNewRequestOption()).click();
  },

  tapOnRequestTile: async () => {
    const requestTile = await getRequestTiles();
    await requestTile.waitForDisplayed();
    await requestTile.click();
  },
  tapOnTime: async () => {
    await (await getSelectedTime()).click();
  },
  tapOnNewJob: async () => {
    await (await getNewJobPage()).click();
  },

  tapOnJobTile: async () => {
    const jobTile = await getJobTile();
    await jobTile.waitForDisplayed();
    await jobTile.click();
  },

  tapOnAddTaskOption: async () => {
    await (await getAddTaskOption()).click();
  },

  tapOnTaskTile: async () => {
    const taskTile = await getTaskTiles();
    await taskTile.waitForDisplayed();
    await taskTile.click();
  },
};
