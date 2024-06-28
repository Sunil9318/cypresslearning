import { loginFlow } from "../flows/login.flow";
import { homeScreen } from "../screenobjects/home.screen";
import { timesheetScreen } from "../screenobjects/timesheet.screen";

describe("Clock in (general timer)", () => {
  let loggedIn = false;

  beforeAll(async () => {
    if (!loggedIn) {
      await loginFlow.executeLoginFlow();
      loggedIn = true;
    }
  });

  it("Clock in (general timer)", async () => {
    await homeScreen.tapOnTimesheetButton();
    await timesheetScreen.tapClockInButton();
    await driver.pause(3000);
    await timesheetScreen.tapOnAllowOnceLocationPermission();

    await timesheetScreen.tapClockOutButton();

    expect(await timesheetScreen.getClockInButton()).toBePresent();
  });
});
