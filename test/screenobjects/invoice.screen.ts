import { constants } from "../helpers/constants";

const getReviewButton = async () => {
  return $(
    driver.isAndroid
      ? '//android.widget.Button [contains(@content-desc,"Review")]'
      : '//XCUIElementTypeButton[contains(@name,"Review")]',
  );
};
async function getNextButton() {
  return $("id=Next");
}
async function getSendTextMessageOption() {
  return $("~Send by text message");
}

async function getSendTextButton() {
  return $("id=ATL-ButtonGroup-Primary-Action-0-Button");
}
const getInvoiceStatus = async () => {
  return $(
    driver.isAndroid
      ? '//android.view.ViewGroup/android.widget.TextView[contains(@text,"' +
          constants.INVOICE_STATUS +
          '")]'
      : '//XCUIElementTypeStaticText[contains(@name,"' +
          constants.INVOICE_STATUS +
          '")]',
  );
};

const getCollectPaymentButton = async () => {
  return await $("~Collect Payment");
};

const getPaymentMethodButton = async () => {
  return $(
    driver.isAndroid
      ? '//android.widget.TextView[@text="Payment method"]'
      : "~Payment method Select",
  );
};

const getOfflinePaymentButton = async () => {
  return $(
    driver.isAndroid
      ? '//android.widget.TextView[@text="Offline payment (cash, check, etc.)"]'
      : "~Offline payment (cash, check, etc.) Select",
  );
};

const getCashButton = async () => {
  return $(
    driver.isAndroid
      ? '(//android.view.ViewGroup[@resource-id="paymentMethodGridItem"])[2]/android.view.ViewGroup'
      : "~Cash",
  );
};

const getModalCollectPaymentButton = async () => {
  return $("~Collect Payment button");
};

const getViewReceiptButton = async () => {
  return $(
    driver.isAndroid
      ? "~View Receipt"
      : '//XCUIElementTypeButton[@name="View Receipt"]',
  );
};

const getDoneButton = async () => {
  return $(
    driver.isAndroid ? "~Done" : '//XCUIElementTypeButton[@name="Done"]',
  );
};

const getPaidStaticText = async () => {
  return $(
    driver.isAndroid
      ? '(//android.widget.TextView[@text="Paid"])[1]'
      : '//XCUIElementTypeStaticText[@name="Paid"]',
  );
};
const getGenerateInvoiceButton = async () => {
  return $("~Generate Invoice");
};

export const invoiceScreen = {
  getInvoiceStatus,
  getGenerateInvoiceButton,
  tapReviewAndSendButton: async () => {
    const reviewButton = await getReviewButton();
    await reviewButton.waitForDisplayed();
    await reviewButton.click();
  },
  tapNextButton: async () => {
    const nextButton = await getNextButton();
    await nextButton.waitForDisplayed();
    await nextButton.click();
  },
  tapSendTextMessageButton: async () => {
    const sendTextMessage = await getSendTextMessageOption();
    await sendTextMessage.waitForDisplayed();
    await sendTextMessage.click();
  },

  sendInvoiceTextMessageToClient: async () => {
    const sendTextButton = await getSendTextButton();
    await sendTextButton.waitForDisplayed();
    await sendTextButton.click();
  },
  tapOnCollectPayment: async () => {
    const element = await getCollectPaymentButton();
    await element.waitForDisplayed({ timeout: constants.ELEMENT_LOAD_TIME });
    await element.click();
  },

  tapOnPaymentMethodButton: async () => {
    const element = await getPaymentMethodButton();
    await element.waitForDisplayed({ timeout: constants.ELEMENT_LOAD_TIME });
    await element.click();
  },

  tapOnOfflinePayment: async () => {
    const element = await getOfflinePaymentButton();
    await element.waitForDisplayed({ timeout: constants.ELEMENT_LOAD_TIME });
    await element.click();
  },

  tapOnCashButton: async () => {
    const element = await getCashButton();
    await element.waitForDisplayed({ timeout: constants.ELEMENT_LOAD_TIME });
    await element.click();
  },

  tapOnModalCollectPaymentButton: async () => {
    const element = await getModalCollectPaymentButton();
    await element.waitForDisplayed({ timeout: constants.ELEMENT_LOAD_TIME });
    await element.click();
  },

  waitForViewReceiptButton: async () => {
    await driver.updateSettings({ snapshotMaxDepth: 62 });
    const element = await getViewReceiptButton();
    await element.waitForDisplayed({ timeout: constants.ELEMENT_LOAD_TIME });
    return element;
  },

  tapOnDoneButton: async () => {
    const element = await getDoneButton();
    await element.waitForDisplayed({ timeout: constants.ELEMENT_LOAD_TIME });
    await element.click();
  },

  waitForPaidText: async () => {
    const element = await getPaidStaticText();
    await element.waitForDisplayed({ timeout: constants.ELEMENT_LOAD_TIME });
    return element;
  },
  tapOnGenerateInvoiceButton: async () => {
    const element = await getGenerateInvoiceButton();
    await element.waitForDisplayed();
    return element.click();
  },
};
