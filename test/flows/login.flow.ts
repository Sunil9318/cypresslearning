import { constants } from "../helpers/constants";
import { loginScreen } from "../screenobjects/login.screen";
import { homeScreen } from "../screenobjects/home.screen";
import { notificationPromptScreen } from "../screenobjects/notificationPrompt.screen";
import { landingScreen } from "../screenobjects/landing.screen";

const goToLoginScreen = async () => {
  // We should use screen objects and let the logic inside these screens
  // so we can reuse them in other flows
  await landingScreen.waitForDisplayed();
  await landingScreen.tapOnLoginButton();

  // It's a good pratice to wait for some element on the screen to be displayed
  // before executing any query or action
  await loginScreen.waitForDisplayed();
};

const LoginFlow = {
  async executeLoginFlow(skipLandingScreen = false) {
    if (!skipLandingScreen) {
      await goToLoginScreen();
    }

    await loginScreen.submitLogin(
      constants.LOGIN_USER,
      constants.LOGIN_PASSWORD,
    );

    const needToRequestPermission =
      await notificationPromptScreen.needToRequestPermission();

    // Some screens can be shown conditionally, so it's a good idea to wait
    // for some elements to be displayed. In order to do that,
    // It's better to avoid drive.pause() and use element.waitForExist() instead
    if (needToRequestPermission) {
      await notificationPromptScreen.tapOnNotRightNowButton();
    }

    await homeScreen.dismissTrackingPrompt();

    await homeScreen.waitForDisplayed();
    const homeElement = await homeScreen.getBottomTabNavigationBar();

    expect(homeElement).toBePresent();

    return homeElement;
  },
  goToLoginScreen,
};

export default LoginFlow;
export const loginFlow = LoginFlow;
