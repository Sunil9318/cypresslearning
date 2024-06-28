import { loginFlow } from "../flows/login.flow";
import { homeScreen } from "../screenobjects/home.screen";
import { newClientScreen } from "../screenobjects/newClient.screen";
import { quickCreateMenu } from "../screenobjects/components/quickCreateMenu";
import { clientScreen } from "../screenobjects/client.screen";
import { newQuoteScreen } from "../screenobjects/newQuote.screen";
import { quoteScreen } from "../screenobjects/quote.screen";
import { newInvoiceScreen } from "../screenobjects/newInvoice.screen";
import { invoiceScreen } from "../screenobjects/invoice.screen";
import { assignTeamScreen } from "../screenobjects/assignTeam.screen";
import { newTaskScreen } from "../screenobjects/newTask.screen";
import { taskScreen } from "../screenobjects/task.screen";
import { jobScreen } from "../screenobjects/job.screen";
import { constants } from "../helpers/constants";
import { quoteFlow } from "../flows/quote.flow";
import { requestFlow } from "../flows/request.flow";
import { requestScreen } from "../screenobjects/request.screen";
import { jobFlow } from "../flows/job.flow";

describe("Quick Create flow", () => {
  let loggedIn = false;

  beforeAll(async () => {
    if (!loggedIn) {
      await loginFlow.executeLoginFlow();
      loggedIn = true;
    }
  });

  it("Create client by manual entry ", async () => {
    await homeScreen.tapOnQuickCreateButton();

    await quickCreateMenu.tapOnClientIcon();

    await newClientScreen.createContact();

    await newClientScreen.tapOnSave();

    const leadElement = await clientScreen.getLead();
    await leadElement.waitForDisplayed({
      timeout: constants.PAGE_TRANSITION_TIME,
    });

    expect(leadElement).toBePresent();
  });

  it("Create a new quote", async () => {
    await homeScreen.tapOnQuickCreateButton();
    await quickCreateMenu.tapOnQuoteIcon();
    await newQuoteScreen.waitForAddClientButtonToBeDisplayed();

    await newQuoteScreen.tapOnAddClientButton();
    await newQuoteScreen.selectFirstItemInClientSearchList();

    await quoteFlow.createQuote();

    await quoteScreen.tapOnReviewAndSend();
    await quoteScreen.tapOnNextButton();
    await quoteScreen.tapOnTextMessageOption();
    await quoteScreen.tapOnSendTextButton();

    const quoteStatusText = await quoteScreen.getQuoteStatusText();
    await quoteStatusText.waitForDisplayed({
      timeout: constants.PAGE_TRANSITION_TIME,
    });

    expect(quoteStatusText).toBePresent();
  });

  it("Create a new invoice and send to client", async () => {
    await homeScreen.tapOnQuickCreateButton();

    await quickCreateMenu.tapOnInvoiceIcon();

    await newInvoiceScreen.waitForAddClientButtonToBeDisplayed();

    await newInvoiceScreen.selectClient();
    await newInvoiceScreen.tapLineItemButton();
    await newInvoiceScreen.selectLineItem();
    await newInvoiceScreen.tapAddToInvoiceButton();
    await newInvoiceScreen.tapSaveLineItemButton();
    await newInvoiceScreen.tapSaveButton();

    await invoiceScreen.tapReviewAndSendButton();
    await invoiceScreen.tapNextButton();
    await invoiceScreen.tapSendTextMessageButton();
    await invoiceScreen.sendInvoiceTextMessageToClient();

    const invoiceStatus = await invoiceScreen.getInvoiceStatus();
    await invoiceStatus.waitForDisplayed({
      timeout: constants.PAGE_TRANSITION_TIME,
    });

    expect(invoiceStatus).toBePresent();
  });

  it("Create a new request with on-site assessment scheduled", async () => {
    await requestFlow.createRequest();
    const leadElement = await requestScreen.getLead();
    await leadElement.waitForDisplayed({
      timeout: constants.PAGE_TRANSITION_TIME,
    });

    expect(leadElement).toBePresent();
  });

  it("Create Task", async () => {
    await homeScreen.tapOnQuickCreateButton();

    await quickCreateMenu.tapOnTaskIcon();

    await newTaskScreen.enterTitle();

    await newTaskScreen.enterDescription();

    await newTaskScreen.tapOnAddClientButton();

    await newTaskScreen.selectClient();
    await newTaskScreen.enterDate();
    await newTaskScreen.enterTime();
    await newTaskScreen.selectDoesNotRepeatOption();
    await newTaskScreen.tapOnTeamButton();
    await assignTeamScreen.selectAndSaveTeam();
    await newTaskScreen.saveTask();

    const taskTitle = await taskScreen.getTaskTitle();
    await taskTitle.waitForDisplayed({
      timeout: constants.PAGE_TRANSITION_TIME,
    });

    expect(taskTitle).toBePresent();
    if (driver.isIOS) {
      await taskScreen.tapBackButton();
    }
  });

  it("Create one-off Job", async () => {
    await jobFlow.quickCreateJob("one-off");
    const jobConfirmationView =
      await jobScreen.getSendBookingConfirmationButton();
    await jobConfirmationView.waitForDisplayed({
      timeout: constants.PAGE_TRANSITION_TIME,
    });

    expect(jobConfirmationView).toBePresent();
    await jobScreen.deleteJob("quick-create");
  });

  it("Create a recurring job", async () => {
    await jobFlow.quickCreateJob("repeating");
    const jobConfirmationView =
      await jobScreen.getSendBookingConfirmationButton();
    await jobConfirmationView.waitForDisplayed({
      timeout: constants.PAGE_TRANSITION_TIME,
    });

    expect(jobConfirmationView).toBePresent();
    await jobScreen.deleteJob("quick-create");
  });
});
