import { loginFlow } from "../flows/login.flow";
import { constants } from "../helpers/constants";
import { jobScreen } from "../screenobjects/job.screen";
import { newJobScreen } from "../screenobjects/newJob.screen";
import { quoteFlow } from "../flows/quote.flow";

describe("Convert Quote to Job", () => {
  let loggedIn = false;

  beforeAll(async () => {
    if (!loggedIn) {
      await loginFlow.executeLoginFlow();
      loggedIn = true;
    }
  });

  beforeEach(async () => {
    await quoteFlow.createApprovedQuote();
  });

  it("Schedule one-off Job from the quote", async () => {
    await newJobScreen.quoteScheduleJob("schedule-one-off");
    const oneOffJobScheduleView =
      await jobScreen.getSendBookingConfirmationButton();
    await oneOffJobScheduleView.waitForDisplayed({
      timeout: constants.PAGE_TRANSITION_TIME,
    });

    expect(oneOffJobScheduleView).toBePresent();
  });

  it("Schedule recurring Job from the quote", async () => {
    await newJobScreen.quoteScheduleJob("schedule-repeating");
    const recurringJobScheduleView =
      await jobScreen.getSendBookingConfirmationButton();
    await recurringJobScheduleView.waitForDisplayed({
      timeout: constants.PAGE_TRANSITION_TIME,
    });

    expect(recurringJobScheduleView).toBePresent();
  });
});
