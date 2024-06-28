import { closeKeyboard } from "../helpers/utils";

async function getEmailTextField() {
  return $("id=intl.inputEmail");
}

async function getPasswordTextField() {
  return $("id=intl.inputPassword");
}

async function getNameTextField() {
  return $("id=intl.inputName");
}

async function getCompanyTextField() {
  return $(
    "id=features.SignUp.views.SignUpView.components.SignUpFormContent.inputCompanyName",
  );
}

async function clickUserDetailsScreenNextButton() {
  return $(
    //TODO: Replace with test-id
    driver.isAndroid
      ? '//android.widget.Button[@content-desc="Next"]/android.view.ViewGroup'
      : "~Next",
  ).click();
}

const getSetupCompanyPage = async () => {
  return $(
    //TODO: Replace with test-id
    driver.isAndroid
      ? "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[4]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup"
      : "~Step 2 of 2 Set up your company Phone number Phone number Company industry Company size What's your estimated annual revenue? How did you hear about Jobber? How did you hear about Jobber? Vertical scroll bar, 1 page Horizontal scroll bar, 1 page Finish",
  );
};

async function getSignupAlertMessage(signupAttribute: string) {
  //TODO replace selector with resource id
  return $(`~Enter your ${signupAttribute}`);
}

async function getSignupAlertShortPasswordMessage() {
  //TODO replace selector with resource id
  return $(`~Your password must be at least 6 characters`);
}

async function getSignupAlertEmptyPasswordMessage() {
  //TODO replace selector with resource id
  return $(`~Enter a password`);
}

export const signUpScreen = {
  getSetupCompanyPage,
  waitForDisplayed: async () => {
    const nameInput = await getNameTextField();
    const companyNameInput = await getCompanyTextField();
    const emailInput = await getEmailTextField();
    const passwordInput = await getPasswordTextField();

    return nameInput && companyNameInput && emailInput && passwordInput;
  },
  submitUserDetailsNext: async (
    name: string,
    companyName: string,
    email: string,
    password: string,
  ) => {
    const nameInput = await getNameTextField();
    const companyNameInput = await getCompanyTextField();
    const emailInput = await getEmailTextField();
    const passwordInput = await getPasswordTextField();

    await nameInput.setValue(name);
    await companyNameInput.setValue(companyName);
    await emailInput.setValue(email);
    await passwordInput.setValue(password);

    await closeKeyboard();

    await clickUserDetailsScreenNextButton();

    return true;
  },
  getSignupAlertMessage,
  getSignupAlertShortPasswordMessage,
  getSignupAlertEmptyPasswordMessage,
};
