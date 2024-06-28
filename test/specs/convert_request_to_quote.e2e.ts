import { requestFlow } from "../flows/request.flow";
import { loginFlow } from "../flows/login.flow";
import { quoteFlow } from "../flows/quote.flow";
import { mainNavigation } from "../screenobjects/components/mainNavigation";
import { homeScreen } from "../screenobjects/home.screen";
import { quoteScreen } from "../screenobjects/quote.screen";
import { requestScreen } from "../screenobjects/request.screen";

describe("Convert request to quote", () => {
  beforeAll(async () => {
    await loginFlow.executeLoginFlow();
    await requestFlow.createCompletedAssessmentRequest();
    await mainNavigation.tapOnHomeTab();
  });

  it("Convert request to quote", async () => {
    await driver.pause(5000);
    await homeScreen.tapOnAssessmentCompletedList();
    await homeScreen.tapOnFirstAssessmentCompletedItem();

    await requestScreen.tapConvertToQuoteButton();

    await quoteFlow.createQuote();

    const reviewAndSendButton = await quoteScreen.getReviewAndSend();

    expect(reviewAndSendButton).toBePresent();

    const approveAndScheduleButton = await quoteScreen.getApproveAndSchedule();

    expect(approveAndScheduleButton).toBePresent();
  });
});
