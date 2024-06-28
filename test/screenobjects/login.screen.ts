import { closeiOSKeyboardByClickingDone } from "../helpers/ios";

async function getEmailTextField() {
  return $("id=intl.inputEmail");
}

async function getPasswordTextField() {
  return $("id=intl.inputPassword");
}

async function getForgotPasswordLink() {
  return $(
    "id=features.Login.components.CredentialsFormContent.forgotPasswordLabel",
  );
}

async function clickLoginButton() {
  await $("id=Log In").click();
}

async function getErrorBanner() {
  const bannerText = "Invalid username or password.";
  return $(
    driver.isAndroid
      ? '//android.widget.TextView[contains(@text, "' + bannerText + '")]'
      : '(//XCUIElementTypeOther[contains(@name,"' + bannerText + '")])',
  );
}

export const loginScreen = {
  waitForDisplayed: async () => {
    const emailInput = await getEmailTextField();
    const passwordInput = await getPasswordTextField();
    const forgotPasswordLink = await getForgotPasswordLink();

    return emailInput && passwordInput && forgotPasswordLink;
  },
  submitLogin: async (email: string, password: string) => {
    const emailInput = await getEmailTextField();
    const passwordInput = await getPasswordTextField();

    await emailInput.setValue(email);
    await passwordInput.setValue(password);

    if (driver.isIOS) {
      await closeiOSKeyboardByClickingDone();
    }

    await clickLoginButton();

    return true;
  },
  getErrorBanner,
};
