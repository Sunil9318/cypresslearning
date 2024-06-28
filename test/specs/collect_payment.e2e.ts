import { invoiceFlow } from "../flows/invoice.flow";
import { loginFlow } from "../flows/login.flow";
import { mainNavigation } from "../screenobjects/components/mainNavigation";
import { homeScreen } from "../screenobjects/home.screen";
import { invoiceScreen } from "../screenobjects/invoice.screen";

describe("Payment", () => {
  beforeAll(async () => {
    await loginFlow.executeLoginFlow();
    await invoiceFlow.createInvoice();
    await mainNavigation.tapOnHomeTab();
  });

  it("Payment", async () => {
    await homeScreen.tapOnInvoicesElement();
    await homeScreen.tapOnInvoice();
    await invoiceScreen.tapOnCollectPayment();
    await invoiceScreen.tapOnPaymentMethodButton();
    await invoiceScreen.tapOnOfflinePayment();
    await invoiceScreen.tapOnCashButton();
    await invoiceScreen.tapOnModalCollectPaymentButton();

    expect(await invoiceScreen.waitForViewReceiptButton()).toBePresent();
    await invoiceScreen.tapOnDoneButton();

    expect(await invoiceScreen.waitForPaidText()).toBePresent();
  });
});
