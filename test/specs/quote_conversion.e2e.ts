import { loginFlow } from "../flows/login.flow";
import { homeScreen } from "../screenobjects/home.screen";
import { constants } from "../helpers/constants";
import { jobScreen } from "../screenobjects/job.screen";
import { newJobScreen } from "../screenobjects/newJob.screen";

describe("Tap Schedule a Job", () => {
  let loggedIn = false;

  beforeAll(async () => {
    if (!loggedIn) {
      await loginFlow.executeLoginFlow();
      loggedIn = true;
    }
  });

  it("Schedule a One-off Job", async () => {
    await homeScreen.tapScheduleAJob();
    await newJobScreen.addClient();
    await newJobScreen.scheduleJob("one-off");
    const jobConfirmationView =
      await jobScreen.getSendBookingConfirmationButton();
    await jobConfirmationView.waitForDisplayed({
      timeout: constants.PAGE_TRANSITION_TIME,
    });

    expect(jobConfirmationView).toBePresent();
  });
});
