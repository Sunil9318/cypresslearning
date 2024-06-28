import Gestures from "../helpers/Gestures";
import { quickCreateMenu } from "../screenobjects/components/quickCreateMenu";
import { constants } from "../helpers/constants";

const getBottomTabNavigationBar = async () => {
  return $("~Bottom Tab Navigation Bar");
};

const getAllowAppNotToTrackButton = async () => {
  return $("~Ask App Not to Track");
};

const getRequestHeading = async () => {
  return $(
    driver.isAndroid
      ? '//*[contains(@text, "Requests")]'
      : '(//XCUIElementTypeOther[@name="Requests"])[2]',
  );
};

const getSetttings = async () => {
  return $("id=SettingsButton");
};

const getTicketCountText = async () => {
  if (driver.isAndroid) {
    return $(
      '//android.view.ViewGroup[@content-desc="Appointment Information"]/android.view.View[3]',
    );
  } else {
    await driver.updateSettings({ snapshotMaxDepth: 80 });
    return $('(//XCUIElementTypeOther[contains(@name,"worth")])[2]');
  }
};

const getTimeSheet = async () => {
  return $("id=TimesheetTab");
};

const getAssessmentCompletedListElement = async () => {
  return $(
    driver.isAndroid
      ? '//android.view.ViewGroup[@content-desc="Assessments completed"]/android.view.ViewGroup'
      : "~Assessments completed",
  );
};
const getAssessmentCompletedElement = async () => {
  return $(
    driver.isAndroid
      ? '//android.view.ViewGroup[@resource-id="content"]/android.view.ViewGroup'
      : "~Assessments completed",
  );
};

const getHomeScreen = async () => {
  return $(driver.isAndroid ? "~Home" : "~HomeTab");
};

const getInvoicesListElement = async () => {
  return $("~Awaiting Payment Invoices");
};

const getInvoicesElement = async () => {
  return $(
    driver.isAndroid
      ? '//android.view.ViewGroup[@resource-id="content"]/android.view.ViewGroup[1]'
      : "~Awaiting Payment Invoices",
  );
};

const getReminder = async () => {
  return $(
    driver.isAndroid
      ? "~reminder"
      : "~Settings Button Jobber Activity Feed Button Back Activity Feed",
  );
};

const getScheduleJobButton = async () => {
  if (driver.isAndroid) {
    return $(
      '//android.view.ViewGroup[@content-desc="Appointment Information"]//*[@resource-id="add"]',
    );
  } else {
    await driver.updateSettings({ snapshotMaxDepth: 80 });
    return $("~SCHEDULE A JOB");
  }
};

const getSchedule = async () => {
  return $(
    driver.isAndroid
      ? '//android.view.ViewGroup[@content-desc="Schedule"]'
      : "id=Schedule",
  );
};
const getRequireInvoicingButton = async () => {
  return $("~Require Invoicing Jobs");
};
const getFirstJobInRequireInvoicing = async () => {
  return $(
    driver.isAndroid
      ? "//android.view.ViewGroup[@content-desc='Require Invoicing Jobs']/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]"
      : "~Require Invoicing Jobs",
  );
};

export const homeScreen = {
  getBottomTabNavigationBar,
  waitForDisplayed: async (timeout?: number) => {
    return (await getBottomTabNavigationBar()).waitForDisplayed({ timeout });
  },

  needToRequestTimeTracking: async () => {
    const element = await getAllowAppNotToTrackButton();

    const isElementDisplayed = await element.isExisting();

    return isElementDisplayed;
  },

  dismissTrackingPrompt: async () => {
    if (driver.isAndroid) {
      return;
    }
    await driver.pause(2000);
    const button = await getAllowAppNotToTrackButton();
    if (await button.isDisplayed()) {
      await button.click();
    }
  },
  tapOnSettingsButton: async () => {
    return (await getSetttings()).click();
  },
  tapOnReminderButton: async () => {
    return (await getReminder()).click();
  },
  tapOnQuickCreateButton: async () => {
    await quickCreateMenu.waitForDisplayed();
    await quickCreateMenu.tapOnPlusMenu();
  },

  getTicketCount: async () => {
    const text = await (await getTicketCountText()).getText();
    const split = text.split(" ")[0];
    return split;
  },
  tapOnHomeButton: async () => {
    return (await getHomeScreen()).click();
  },

  tapScheduleAJob: async () => {
    const addJob = await getScheduleJobButton();
    await (
      await getRequestHeading()
    ).waitForDisplayed({ timeout: constants.PAGE_TRANSITION_TIME });
    if (!(await addJob.isDisplayed())) {
      const ticketCount = Number(await homeScreen.getTicketCount());
      await Gestures.checkIfDisplayedWithSwipeLeft(addJob, ticketCount + 1);
    }
    await addJob.click();
  },
  tapOnTimesheetButton: async () => {
    return (await getTimeSheet()).click();
  },

  tapOnAssessmentCompletedList: async () => {
    const assessmentCompletedListElement =
      await getAssessmentCompletedListElement();
    await assessmentCompletedListElement.waitForDisplayed({
      timeout: 6000,
    });
    await assessmentCompletedListElement.click();
  },

  tapOnFirstAssessmentCompletedItem: async () => {
    const assessmentCompletedElement = await getAssessmentCompletedElement();
    await assessmentCompletedElement.waitForDisplayed({
      timeout: 6000,
    });
    await assessmentCompletedElement.click();
  },
  tapOnInvoicesElement: async () => {
    const element = await getInvoicesListElement();
    await Gestures.checkIfDisplayedWithSwipeUp(element, 2);
    await element.click();
  },
  tapOnInvoice: async () => {
    await (await getInvoicesElement()).click();
  },
  tapOnRequireInvoicing: async () => {
    const element = await getRequireInvoicingButton();
    await Gestures.checkIfDisplayedWithSwipeUp(element, 2);
    await element.click();
  },
  tapOnFirstJob: async () => {
    await (await getFirstJobInRequireInvoicing()).click();
  },
};
