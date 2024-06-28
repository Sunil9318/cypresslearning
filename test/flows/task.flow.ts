import { assignTeamScreen } from "../screenobjects/assignTeam.screen";
import { newTaskScreen } from "../screenobjects/newTask.screen";
import { scheduleScreen } from "../screenobjects/schedule.screen";
import { addClientScreen } from "../screenobjects/addClient.screen";

const TaskFlow = {
  async createTask() {
    await scheduleScreen.tapOnTimerIndicator();
    const monthDayString = await scheduleScreen.getTimeDateValue();

    await scheduleScreen.tapOnAddTaskOption();

    await newTaskScreen.enterTitle();
    await newTaskScreen.enterDescription();
    await newTaskScreen.tapOnAddClientButton();
    await addClientScreen.selectFirstClientInSearchList();
    const datePlaceHolder = await newTaskScreen.getEnteredDate();

    const startTimePlaceHolder = await newTaskScreen.getEnteredStartTime();

    expect(monthDayString.includes(datePlaceHolder[0])).toEqual(true);
    expect(monthDayString.includes(datePlaceHolder[1])).toEqual(true);
    expect(monthDayString.includes(startTimePlaceHolder)).toEqual(true);

    await newTaskScreen.tapOnTeamButton();
    await assignTeamScreen.selectAndSaveTeam();
    await newTaskScreen.saveTask();
  },
};

export default TaskFlow;
export const taskFlow = TaskFlow;
