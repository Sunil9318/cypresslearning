import { newJobScreen } from "../screenobjects/newJob.screen";
import { visitScreen } from "../screenobjects/visit.screen";
import { quickCreateMenu } from "../screenobjects/components/quickCreateMenu";
import { jobScreen } from "../screenobjects/job.screen";

const JobFlow = {
  async createJobForInvoicing() {
    await jobFlow.quickCreateJob("one-off");
    await jobFlow.completeVisitAndInvoiceLater();
  },
  async quickCreateJob(options: "one-off" | "repeating" | "repeating-monthly") {
    await quickCreateMenu.tapOnPlusMenu();
    await quickCreateMenu.tapOnJobIcon();
    await newJobScreen.addClient();
    await newJobScreen.scheduleJob(options);
  },

  async completeVisitAndInvoiceLater() {
    await jobScreen.scrollToVisitSectionAndTapFirstVisit();
    await visitScreen.tapOnCompleteVisitButton();
    await visitScreen.tapOnInvoiceLaterButton();
  },
};

export default JobFlow;
export const jobFlow = JobFlow;
