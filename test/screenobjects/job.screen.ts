import Gestures from "../helpers/Gestures";

async function getSendBookingConfirmationButton() {
  if (driver.isAndroid) {
    return $("id=Send Booking Confirmation");
  } else {
    await driver.updateSettings({ snapshotMaxDepth: 62 });
    return $(
      '//XCUIElementTypeButton[contains(@name,"Send Booking Confirmation")]',
    );
  }
}

const getMoreButton = async () => {
  return $(
    driver.isAndroid ? "id=More" : '//XCUIElementTypeButton[@name="More"]',
  );
};

const getDeleteJobButton = async () => {
  return $("~Delete Job");
};

const getDeleteButtonInPopup = async () => {
  return $(driver.isAndroid ? "id=android:id/button1" : "~Delete");
};

const getGenerateInvoiceButton = async () => {
  return $(
    driver.isAndroid
      ? "id=Generate Invoice"
      : '//XCUIElementTypeButton[@name="Generate Invoice"]',
  );
};

const getVisitSection = async () => {
  return $(
    driver.isAndroid
      ? '//android.widget.Button[@content-desc="Visits"]'
      : "~Visits",
  );
};

const getFirstVisitItem = async () => {
  return $(
    driver.isAndroid
      ? "//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup" +
          "/android.view.ViewGroup[1]/android.view.ViewGroup[1]"
      : "~Visits",
  );
};

export const jobScreen = {
  getSendBookingConfirmationButton,
  getGenerateInvoiceButton,
  scrollToSendBookingConfirmationButton: async () => {
    const sendBookingConfirmationButton =
      await getSendBookingConfirmationButton();
    await Gestures.checkIfDisplayedWithSwipeDown(
      sendBookingConfirmationButton,
      3,
    );
  },
  tapOnMoreButton: async () => {
    const moreButton = await getMoreButton();
    await moreButton.waitForDisplayed();
    await moreButton.click();
  },
  tapOnDeleteJobButton: async () => {
    const deleteJobButton = await getDeleteJobButton();
    await deleteJobButton.waitForDisplayed();
    await deleteJobButton.click();
  },
  tapDeleteButtonPopup: async () => {
    const deleteButtonPopup = await getDeleteButtonInPopup();
    await deleteButtonPopup.waitForDisplayed();
    await deleteButtonPopup.click();
  },
  deleteJob: async (options: "quick-create" | "schedule") => {
    if (options === "schedule") {
      await jobScreen.scrollToSendBookingConfirmationButton();
    }

    await jobScreen.tapOnMoreButton();
    await jobScreen.tapOnDeleteJobButton();
    await jobScreen.tapDeleteButtonPopup();
    await driver.pause(2000);
  },
  scrollToVisitSectionAndTapFirstVisit: async () => {
    await Gestures.checkIfDisplayedWithSwipeUp(await getVisitSection(), 2);
    await (await getFirstVisitItem()).click();
  },
};
