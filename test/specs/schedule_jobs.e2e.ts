import { loginFlow } from "../flows/login.flow";
import { jobScreen } from "../screenobjects/job.screen";
import { constants } from "../helpers/constants";
import { mainNavigation } from "../screenobjects/components/mainNavigation";
import { scheduleScreen } from "../screenobjects/schedule.screen";
import { newJobScreen } from "../screenobjects/newJob.screen";
import { visitScreen } from "../screenobjects/visit.screen";

describe("Schedule Create flow", () => {
  let loggedIn = false;

  beforeAll(async () => {
    if (!loggedIn) {
      await loginFlow.executeLoginFlow();
      loggedIn = true;
    }
  });

  it("Schedule a Job", async () => {
    await mainNavigation.tapOnScheduleTab();
    await scheduleScreen.tapOnTimerIndicator();
    await scheduleScreen.tapOnNewJob();
    await newJobScreen.addClient();
    await newJobScreen.scheduleJob("one-off");

    const jobCreatedView = await jobScreen.getSendBookingConfirmationButton();
    await jobCreatedView.waitForDisplayed({
      timeout: constants.PAGE_TRANSITION_TIME,
    });

    expect(jobCreatedView).toBePresent();
  });

  it("Start or Stop timer on one-off job", async () => {
    await mainNavigation.tapOnScheduleTab();

    await scheduleScreen.tapOnJobTile();

    await visitScreen.tapOnStartTimerButton();

    await visitScreen.tapOnStopTimerButton();

    const timerButton = await visitScreen.getStartTimerButton();
    await timerButton.waitForDisplayed({
      timeout: constants.PAGE_TRANSITION_TIME,
    });

    expect(timerButton).toBePresent();
  });

  it("Complete a One-off Job", async () => {
    await visitScreen.tapOnCompleteVisitButton();
    await visitScreen.tapOnInvoiceLaterButton();

    const visitCompletedButton = await visitScreen.getCompletedButton();
    await visitCompletedButton.waitForDisplayed();

    expect(visitCompletedButton).toBePresent();

    await visitScreen.deleteVisit();

    await driver.pause(5000);
  });

  it("Create a recurring job (with multiple visits)", async () => {
    await mainNavigation.tapOnScheduleTab();

    await scheduleScreen.tapOnTimerIndicator();

    await scheduleScreen.tapOnNewJob();
    await newJobScreen.addClient();
    await newJobScreen.scheduleJob("repeating");

    const jobCreatedView = await jobScreen.getSendBookingConfirmationButton();
    await jobCreatedView.waitForDisplayed({
      timeout: constants.PAGE_TRANSITION_TIME,
    });

    expect(jobCreatedView).toBePresent();
  });

  it("Complete a visit on a recurring job", async () => {
    await visitScreen.tapOnMoreButton();
    await visitScreen.tapOnGoToVisitButton();
    await visitScreen.tapOnSelectJobFromList();

    await visitScreen.tapOnCompleteVisitButton();

    const visitCompletedButton = await visitScreen.getCompletedButton();
    await visitCompletedButton.waitForDisplayed();

    expect(visitCompletedButton).toBePresent();

    await visitScreen.tapOnBackButton();
    await jobScreen.deleteJob("schedule");
    await driver.pause(5000);
  });
});
