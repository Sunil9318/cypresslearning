import { loginFlow } from "../flows/login.flow";
import { constants } from "../helpers/constants";
import { homeScreen } from "../screenobjects/home.screen";
import { loginScreen } from "../screenobjects/login.screen";

describe("Login flow", () => {
  it("should give an error banner with an invalid username or password", async () => {
    await loginFlow.goToLoginScreen();
    await loginScreen.waitForDisplayed();
    await loginScreen.submitLogin(
      constants.BAD_LOGIN_USER,
      constants.LOGIN_PASSWORD,
    );
    const errorBanner = await loginScreen.getErrorBanner();

    expect(errorBanner).toBePresent();

    const homeElement = await homeScreen.getBottomTabNavigationBar();

    expect(homeElement).not.toBePresent();
  });

  /* The following is a 👑 GOLDEN EXAMPLE 👑 for a Jasmine spec */
  it("should login with valid credentials", async () => {
    const homeElement = await loginFlow.executeLoginFlow(true);

    // Every spec should have a expect to make sure we don't have false positives
    expect(homeElement).toBePresent();
  });
});
