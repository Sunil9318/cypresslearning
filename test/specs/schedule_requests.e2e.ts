import { loginFlow } from "../flows/login.flow";

import { mainNavigation } from "../screenobjects/components/mainNavigation";
import { scheduleScreen } from "../screenobjects/schedule.screen";
import { assignTeamScreen } from "../screenobjects/assignTeam.screen";

import { constants } from "../helpers/constants";
import { newRequestScreen } from "../screenobjects/newRequest.screen";
import { requestScreen } from "../screenobjects/request.screen";
import { newTaskScreen } from "../screenobjects/newTask.screen";

describe("Schedule Create flow", () => {
  let loggedIn = false;

  beforeAll(async () => {
    if (!loggedIn) {
      await loginFlow.executeLoginFlow();
      loggedIn = true;
    }
  });

  it("Schedule Create - Create a new request with on-site assessment scheduled", async () => {
    await mainNavigation.tapOnScheduleTab();
    await scheduleScreen.tapOnTimerIndicator();
    const monthDayString = await scheduleScreen.getTimeDateValue();

    await scheduleScreen.tapOnNewRequestOption();
    await newTaskScreen.tapOnAddClientButton();
    await newTaskScreen.selectClient();
    await newRequestScreen.enterRequestTitle();
    await newRequestScreen.enterInstructions();

    const dateTimePlaceHolder =
      await newRequestScreen.getDateTimePlaceholderText();

    expect(monthDayString.includes(dateTimePlaceHolder[0])).toEqual(true);
    expect(monthDayString.includes(dateTimePlaceHolder[1])).toEqual(true);
    expect(monthDayString.includes(dateTimePlaceHolder[2])).toEqual(true);

    await newRequestScreen.tapOnTeamButton();
    await assignTeamScreen.selectAndSaveTeam();
    await newRequestScreen.saveRequest();

    const requestTitleText = await requestScreen.getLead();
    await requestTitleText.waitForDisplayed({
      timeout: constants.PAGE_TRANSITION_TIME,
    });

    expect(requestTitleText).toBePresent();
  });

  it("Schedule Create - Complete an on-site assessment for request and delete it.", async () => {
    await mainNavigation.tapOnScheduleTab();
    await scheduleScreen.tapOnRequestTile();
    await requestScreen.tapOnCompleteAssessmentButton();
    const requestCompleteButton = await requestScreen.getCompleteButton();
    await requestCompleteButton.waitForDisplayed({
      timeout: constants.PAGE_TRANSITION_TIME,
    });

    expect(requestCompleteButton).toBePresent();
    await requestScreen.tapMoreButton();
    await requestScreen.tapDeleteButton();
    await requestScreen.tapDeleteButtonPopup();

    const timeIndicatorLine = await scheduleScreen.getTimeIndicator();
    await timeIndicatorLine.waitForDisplayed({
      timeout: constants.PAGE_TRANSITION_TIME,
    });

    expect(timeIndicatorLine).toBePresent();
  });
});
