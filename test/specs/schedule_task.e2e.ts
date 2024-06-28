import { loginFlow } from "../flows/login.flow";
import { taskFlow } from "../flows/task.flow";
import { mainNavigation } from "../screenobjects/components/mainNavigation";
import { scheduleScreen } from "../screenobjects/schedule.screen";
import { taskScreen } from "../screenobjects/task.screen";
import { constants } from "../helpers/constants";

describe("Schedule Create flow", () => {
  let loggedIn = false;

  beforeAll(async () => {
    if (!loggedIn) {
      await loginFlow.executeLoginFlow();
      loggedIn = true;
    }
  });

  it("Schedule Create - Create a new task", async () => {
    await mainNavigation.tapOnScheduleTab();

    await taskFlow.createTask();

    const completeTaskButton = await taskScreen.getCompleteTaskButton();
    await completeTaskButton.waitForDisplayed({
      timeout: constants.PAGE_TRANSITION_TIME,
    });

    expect(completeTaskButton).toBePresent();
  });

  it("Schedule Create - Complete a task from the schedule and delete it.", async () => {
    await mainNavigation.tapOnScheduleTab();
    await scheduleScreen.getTaskTiles();
    await scheduleScreen.tapOnTaskTile();
    await taskScreen.tapOnCompleteTaskButton();
    const taskCompleteButton = await taskScreen.getTaskCompleteButton();
    await taskCompleteButton.waitForDisplayed({
      timeout: constants.PAGE_TRANSITION_TIME,
    });

    expect(taskCompleteButton).toBePresent();

    await taskScreen.tapMoreButton();
    await taskScreen.tapDeleteTask();
    await taskScreen.tapDeleteButtonPopup();

    const timeIndicatorLine = await scheduleScreen.getTimeIndicator();
    await timeIndicatorLine.waitForDisplayed({
      timeout: constants.PAGE_TRANSITION_TIME,
    });

    expect(timeIndicatorLine).toBePresent();
  });
});
