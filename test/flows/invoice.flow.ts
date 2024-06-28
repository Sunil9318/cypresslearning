import Gestures from "../helpers/Gestures";
import { quickCreateMenu } from "../screenobjects/components/quickCreateMenu";
import { homeScreen } from "../screenobjects/home.screen";
import { invoiceScreen } from "../screenobjects/invoice.screen";
import { newInvoiceScreen } from "../screenobjects/newInvoice.screen";

const InvoiceFlow = {
  async createInvoice() {
    await homeScreen.tapOnQuickCreateButton();

    await quickCreateMenu.tapOnInvoiceIcon();

    await newInvoiceScreen.waitForAddClientButtonToBeDisplayed();

    await newInvoiceScreen.selectClient();
    await newInvoiceScreen.tapLineItemButton();
    await Gestures.swipeUp(1);
    await newInvoiceScreen.selectLineItem(10);
    await newInvoiceScreen.tapAddToInvoiceButton();
    await newInvoiceScreen.tapSaveLineItemButton();
    await Gestures.swipeUp(1);
    await newInvoiceScreen.tapSaveButton();
    await invoiceScreen.tapReviewAndSendButton();
    await invoiceScreen.tapNextButton();
    await invoiceScreen.tapSendTextMessageButton();
    await invoiceScreen.sendInvoiceTextMessageToClient();
    const invoiceStatus = await invoiceScreen.getInvoiceStatus();
    await invoiceStatus.waitForDisplayed({ timeout: 5000 });
    expect(invoiceStatus).toBePresent();
  },
};

export default InvoiceFlow;
export const invoiceFlow = InvoiceFlow;
