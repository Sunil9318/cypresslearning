import { assignTeamScreen } from "../screenobjects/assignTeam.screen";
import { quickCreateMenu } from "../screenobjects/components/quickCreateMenu";
import { homeScreen } from "../screenobjects/home.screen";
import { newRequestScreen } from "../screenobjects/newRequest.screen";
import { requestScreen } from "../screenobjects/request.screen";
import { scheduleAssessmentScreen } from "../screenobjects/scheduleAssessment.screen";
import { addClientScreen } from "../screenobjects/addClient.screen";

const RequestFlow = {
  async createRequest() {
    await homeScreen.tapOnQuickCreateButton();
    await quickCreateMenu.tapOnRequestIcon();
    await newRequestScreen.waitForAddClientButtonToBeDisplayedAndTap();
    await addClientScreen.selectFirstClientInSearchList();

    await newRequestScreen.enterRequestTitle();

    await newRequestScreen.tapScheduleButton();

    await scheduleAssessmentScreen.enterInstructions();
    await scheduleAssessmentScreen.enterDate();
    await scheduleAssessmentScreen.enterTime();
    await scheduleAssessmentScreen.tapOnTeamSelectionButton();
    await assignTeamScreen.selectAndSaveTeam();
    await scheduleAssessmentScreen.saveAssessment();
    await newRequestScreen.saveRequest();
  },
  async createCompletedAssessmentRequest() {
    await requestFlow.createRequest();
    await requestScreen.tapOnCompleteAssessmentButton();
  },
};

export default RequestFlow;
export const requestFlow = RequestFlow;
