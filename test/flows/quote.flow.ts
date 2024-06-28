import { quickCreateMenu } from "../screenobjects/components/quickCreateMenu";
import { homeScreen } from "../screenobjects/home.screen";
import { newQuoteScreen } from "../screenobjects/newQuote.screen";
import { quoteScreen } from "../screenobjects/quote.screen";
import { addClientScreen } from "../screenobjects/addClient.screen";

const QuoteFlow = {
  async createQuote() {
    await newQuoteScreen.enterJobTitle();
    await newQuoteScreen.tapLineItemButton();
    await newQuoteScreen.selectLineItems();
    await newQuoteScreen.tapAddToQuoteButton();
    await newQuoteScreen.saveLineItem();
    await newQuoteScreen.tapOnSaveQuoteButton();
  },
  async createApprovedQuote() {
    await homeScreen.tapOnQuickCreateButton();
    await quickCreateMenu.tapOnQuoteIcon();
    await newQuoteScreen.waitForAddClientButtonToBeDisplayed();
    await newQuoteScreen.tapOnAddClientButton();
    await addClientScreen.selectFirstClientInSearchList();
    await quoteFlow.createQuote();
    await quoteScreen.tapOnApproveAndschedule();
    await driver.pause(3000);
    await quoteScreen.tapOnConfirm();
  },
};

export default QuoteFlow;
export const quoteFlow = QuoteFlow;
