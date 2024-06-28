import { requestFlow } from "../flows/request.flow";
import { loginFlow } from "../flows/login.flow";
import { mainNavigation } from "../screenobjects/components/mainNavigation";
import { homeScreen } from "../screenobjects/home.screen";
import { requestScreen } from "../screenobjects/request.screen";
import { newJobScreen } from "../screenobjects/newJob.screen";
import { jobScreen } from "../screenobjects/job.screen";

describe("Convert request to job", () => {
  beforeAll(async () => {
    await loginFlow.executeLoginFlow();
  });

  beforeEach(async () => {
    await mainNavigation.tapOnHomeTab();
    await requestFlow.createCompletedAssessmentRequest();
    await mainNavigation.tapOnHomeTab();
  });

  it("Convert request to one-off job", async () => {
    await driver.pause(5000);
    await homeScreen.tapOnAssessmentCompletedList();
    await homeScreen.tapOnFirstAssessmentCompletedItem();

    await requestScreen.tapConvertToJobButton();

    await newJobScreen.scheduleJob("one-off");

    const jobConfirmationView =
      await jobScreen.getSendBookingConfirmationButton();
    await jobConfirmationView.waitForDisplayed({
      timeout: 6000,
    });

    expect(jobConfirmationView).toBePresent();
  });

  it("Convert request to recurring job", async () => {
    await driver.pause(5000);
    await homeScreen.tapOnFirstAssessmentCompletedItem();

    await requestScreen.tapConvertToJobButton();

    await newJobScreen.scheduleJob("repeating");

    const jobConfirmationView =
      await jobScreen.getSendBookingConfirmationButton();
    await jobConfirmationView.waitForDisplayed({
      timeout: 6000,
    });

    expect(jobConfirmationView).toBePresent();
  });
});
