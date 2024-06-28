import { closeiOSKeyboardByClickingDone } from "../helpers/ios";
import { closeKeyboard } from "../helpers/utils";

async function getPhone() {
  return $(
    //TODO replace selector with resource id
    driver.isAndroid
      ? '//android.widget.EditText[@content-desc="Phone number"]'
      : "~Phone number",
  );
}

async function getCompanyIndustryTextField() {
  return $("id=ATL-selected-industry-Select");
}

async function getCompanySizeTextField() {
  return $("id=ATL-size-of-company-Select");
}

async function getCompanyRevenueTextField() {
  return $("id=ATL-business-revenue-Select");
}

async function getAboutJobTextField() {
  return $(
    //TODO replace selector with resource id
    driver.isAndroid
      ? '//android.widget.EditText[@content-desc="How did you hear about Jobber?"]'
      : "~How did you hear about Jobber?",
  );
}

async function clickFinishButton() {
  return $(
    //TODO replace selector with resource id
    driver.isAndroid
      ? '//android.widget.Button[@content-desc="Finish"]/android.view.ViewGroup'
      : '-ios predicate string:label == "Finish" AND type == "XCUIElementTypeButton"',
  ).click();
}

const getSetupCompanyPage = async () => {
  return $(
    //TODO replace selector with resource id
    driver.isAndroid
      ? "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[4]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup"
      : "~Step 2 of 2 Set up your company Phone number Phone number Company industry Company size What's your estimated annual revenue? How did you hear about Jobber? How did you hear about Jobber? Vertical scroll bar, 1 page Horizontal scroll bar, 1 page Finish",
  );
};

async function getAgreeToSMSNotificationsSwitch() {
  return $(
    //TODO replace selector with resource id
    "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[4]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.CheckBox/android.view.ViewGroup",
  );
}

async function selectIndustryType(industryType: string) {
  //TODO replace selector with resource id
  return $(
    driver.isAndroid
      ? `//android.widget.CheckedTextView[@resource-id="android:id/text1" and @text="${industryType}"]`
      : `id=${industryType}`,
  ).click();
}

async function setCompanySize(size: string) {
  //TODO replace selector with resource id
  return $(
    driver.isAndroid
      ? `//android.widget.CheckedTextView[@resource-id="android:id/text1" and @text="${size}"]`
      : `id=${size}`,
  ).click();
}

async function getCompanyRevenue() {
  return $(
    driver.isAndroid
      ? "/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ListView/android.widget.CheckedTextView[2]"
      : "id=$0 - $50,000",
  ).click();
}

async function getProfileCannotBeSavedAlert() {
  //TODO replace selector with resource id
  return $(
    driver.isAndroid
      ? '//android.widget.TextView[@text="Company profile cannot be saved."]'
      : "~Company profile cannot be saved.",
  );
}

async function getIndustryAlert() {
  //TODO replace selector with resource id
  return $(
    driver.isAndroid
      ? '//android.widget.TextView[@text="Please select your company industry."]'
      : "~Please select your company industry.",
  );
}

async function getCompanySizeAlert() {
  //TODO replace selector with resource id
  return $(
    driver.isAndroid
      ? '//android.widget.TextView[@text="Please select your company size."]'
      : "~Please select your company size.",
  );
}

async function selectIndustry(industryType: string) {
  await (await getCompanyIndustryTextField()).click();
  await selectIndustryType(industryType);
}

async function selectCompanySize(size: string) {
  await (await getCompanySizeTextField()).click();
  await setCompanySize(size);
}

export const companySetUpScreen = {
  getSetupCompanyPage,
  waitForDisplayed: async () => {
    const phoneInput = await getPhone();
    const companyIndustryInput = await getCompanyIndustryTextField();
    const companySizeInput = await getCompanySizeTextField();
    const companyRevenueInput = await getCompanyRevenueTextField();
    const aboutJobInput = await getAboutJobTextField();

    return (
      phoneInput &&
      companyIndustryInput &&
      companySizeInput &&
      companyRevenueInput &&
      aboutJobInput
    );
  },
  updateCompanySetUp: async (phone: number, aboutJob: string) => {
    const phoneInput = await getPhone();
    const aboutJobInput = await getAboutJobTextField();

    await phoneInput.setValue(phone);

    await selectIndustry("Computers & IT");
    await selectCompanySize("2-3 people");
    await (await getCompanyRevenueTextField()).click();
    await getCompanyRevenue();

    await aboutJobInput.setValue(aboutJob);

    if (driver.isIOS) {
      await closeiOSKeyboardByClickingDone();
    }
    await clickFinishButton();

    return true;
  },
  finishForm: async () => {
    const isKeyboardShown = await driver.isKeyboardShown();
    if (isKeyboardShown) {
      await closeKeyboard();
    }
    await clickFinishButton();
    const profileCannotBeSavedAlert = await getProfileCannotBeSavedAlert();
    return profileCannotBeSavedAlert;
  },
  selectIndustry,
  selectCompanySize,
  getIndustryAlert,
  getCompanySizeAlert,
};
