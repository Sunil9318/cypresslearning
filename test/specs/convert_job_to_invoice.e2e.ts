import { jobFlow } from "../flows/job.flow";
import { loginFlow } from "../flows/login.flow";
import { constants } from "../helpers/constants";
import { mainNavigation } from "../screenobjects/components/mainNavigation";
import { homeScreen } from "../screenobjects/home.screen";
import { invoiceScreen } from "../screenobjects/invoice.screen";

describe("Convert completed job into invoice and sends to client", () => {
  beforeAll(async () => {
    await driver.updateSettings({ disableIdLocatorAutocompletion: true });
    await loginFlow.executeLoginFlow();
    await jobFlow.createJobForInvoicing();
    await mainNavigation.tapOnHomeTab();
  });

  it("Convert completed job into invoice and sends to client", async () => {
    await driver.pause(constants.ELEMENT_LOAD_TIME);
    await homeScreen.tapOnRequireInvoicing();
    await homeScreen.tapOnFirstJob();
    await invoiceScreen.tapOnGenerateInvoiceButton();
    await invoiceScreen.tapReviewAndSendButton();

    await invoiceScreen.tapNextButton();
    await invoiceScreen.tapSendTextMessageButton();
    await invoiceScreen.sendInvoiceTextMessageToClient();

    const invoiceStatus = await invoiceScreen.getInvoiceStatus();
    await invoiceStatus.waitForDisplayed({ timeout: 5000 });

    expect(invoiceStatus).toBePresent();
  });
});
