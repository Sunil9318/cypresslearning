import { constants } from "../helpers/constants";

async function getReviewAndSendButton() {
  return $(
    driver.isAndroid
      ? '//android.widget.Button[contains(@resource-id,"Review")]'
      : '//XCUIElementTypeButton[contains(@name,"Review")]',
  );
}

async function getApproveAndScheduleButton() {
  return $(
    driver.isAndroid
      ? "~Approve & Schedule"
      : '//XCUIElementTypeButton[contains(@name,"Approve")]',
  );
}

async function getNextButton() {
  return $("~Next");
}
async function getSendByTextMessageOption() {
  return $("~Send by text message");
}

async function getSendTextButton() {
  return $("~Send Text");
}
async function getQuoteStatusText() {
  return $(
    driver.isAndroid
      ? '//android.widget.TextView[contains(@text, "' +
          constants.TASK_STATUS_AFTER_CREATION +
          '")]'
      : '//XCUIElementTypeStaticText[@name="' +
          constants.TASK_STATUS_AFTER_CREATION +
          '"]',
  );
}
async function getApproveAndSendButton() {
  return $("~Approve & Schedule");
}

async function getConfirmButton() {
  return $("~Confirm");
}

export const quoteScreen = {
  getQuoteStatusText,
  getReviewAndSend: async () => {
    return await getReviewAndSendButton();
  },
  tapOnReviewAndSend: async () => {
    const reviewButton = await getReviewAndSendButton();
    await reviewButton.waitForDisplayed();
    await reviewButton.click();
  },
  getApproveAndSchedule: async () => {
    return await getApproveAndScheduleButton();
  },
  tapOnNextButton: async () => {
    const nextButton = await getNextButton();
    await nextButton.waitForDisplayed();
    await nextButton.click();
  },

  tapOnTextMessageOption: async () => {
    const sendTextMessageOption = await getSendByTextMessageOption();
    await sendTextMessageOption.waitForDisplayed();
    await sendTextMessageOption.click();
  },

  tapOnSendTextButton: async () => {
    const sendTextButton = await getSendTextButton();
    await sendTextButton.waitForDisplayed();
    await sendTextButton.click();
    driver.setImplicitTimeout(1000);
  },
  tapOnApproveAndschedule: async () => {
    const approveAndSendButton = await getApproveAndSendButton();
    await approveAndSendButton.waitForDisplayed();
    await approveAndSendButton.click();
  },
  tapOnConfirm: async () => {
    const confirmButton = await getConfirmButton();
    await confirmButton.waitForDisplayed();
    await confirmButton.click();
  },
};
