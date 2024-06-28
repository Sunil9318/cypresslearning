import * as faker from "faker";
import { landingScreen } from "../screenobjects/landing.screen";
import { signUpScreen } from "../screenobjects/signUp.screen";
import { constants } from "../helpers/constants";
import { homeScreen } from "../screenobjects/home.screen";
import { companySetUpScreen } from "../screenobjects/companySetup.screen";
import { notificationPromptScreen } from "../screenobjects/notificationPrompt.screen";
import { onBoardingScreen } from "../screenobjects/onBoarding.screen";

describe("Sign-up Flow", () => {
  beforeAll(async () => {
    await landingScreen.tapOnSignUpFreeButton();
  });

  describe("Step 1 of 2", () => {
    it("should give an error if an invalid email is provided", async () => {
      await signUpScreen.submitUserDetailsNext(
        faker.name.findName(),
        faker.company.companyName(),
        constants.INVALID_USER,
        constants.LOGIN_PASSWORD,
      );

      const errorElement = await signUpScreen.getSignupAlertMessage("email");

      expect(errorElement).toBePresent();

      const companySetupPage = await signUpScreen.getSetupCompanyPage();

      expect(companySetupPage).not.toBePresent();
    });

    it("should give an error if too short of a password is provided", async () => {
      await signUpScreen.submitUserDetailsNext(
        faker.name.findName(),
        faker.company.companyName(),
        faker.internet.email(),
        constants.INVALID_PASSWORD,
      );

      const errorElement =
        await signUpScreen.getSignupAlertShortPasswordMessage();

      expect(errorElement).toBePresent();

      const companySetupPage = await signUpScreen.getSetupCompanyPage();

      expect(companySetupPage).not.toBePresent();
      await driver.setImplicitTimeout(1000);
    });

    it("should give alerts when fields are left blank", async () => {
      await signUpScreen.submitUserDetailsNext("", "", "", "");

      const errorElementName = await signUpScreen.getSignupAlertMessage("name");

      expect(errorElementName).toBePresent();

      const errorElementCompany = await signUpScreen.getSignupAlertMessage(
        "company name",
      );

      expect(errorElementCompany).toBePresent();

      const errorElementEmail = await signUpScreen.getSignupAlertMessage(
        "email",
      );

      expect(errorElementEmail).toBePresent();

      const errorElementPassword =
        await signUpScreen.getSignupAlertEmptyPasswordMessage();

      expect(errorElementPassword).toBePresent();

      const companySetupPage = await signUpScreen.getSetupCompanyPage();

      expect(companySetupPage).not.toBePresent();
    });
  });

  describe("Step 2 of 2", () => {
    beforeAll(async () => {
      await signUpScreen.submitUserDetailsNext(
        faker.name.findName(),
        faker.company.companyName(),
        faker.internet.email(),
        constants.LOGIN_PASSWORD,
      );
    });

    it("Should show company setup screen", async () => {
      await companySetUpScreen.waitForDisplayed();
      const companyElement = await companySetUpScreen.getSetupCompanyPage();

      expect(companyElement).toBePresent();
    });

    it("should not welcome and prompt for industry and size of company when both unselected", async () => {
      await companySetUpScreen.selectIndustry("Select your industry");
      await companySetUpScreen.selectCompanySize("Select your size");

      const profileCannotBeSavedAlert = await companySetUpScreen.finishForm();

      expect(profileCannotBeSavedAlert).toBePresent();

      const jobberWelcomeElement =
        await onBoardingScreen.getJobberWelcomePage();

      expect(jobberWelcomeElement).not.toBePresent();

      const companySizeAlert = await companySetUpScreen.getCompanySizeAlert();

      expect(companySizeAlert).toBePresent();

      const industryAlert = await companySetUpScreen.getIndustryAlert();

      expect(industryAlert).toBePresent();
    });

    it("should not welcome and prompt for company size when not selected", async () => {
      await companySetUpScreen.selectIndustry("Appliance Repair");
      await companySetUpScreen.selectCompanySize("Select your size");

      const profileCannotBeSavedAlert = await companySetUpScreen.finishForm();

      expect(profileCannotBeSavedAlert).toBePresent();

      const jobberWelcomeElement =
        await onBoardingScreen.getJobberWelcomePage();

      expect(jobberWelcomeElement).not.toBePresent();

      const industryAlert = await companySetUpScreen.getCompanySizeAlert();

      expect(industryAlert).toBePresent();
    });

    it("should sign up with valid data", async () => {
      await companySetUpScreen.updateCompanySetUp(
        faker.phone.phoneNumber("##########"),
        faker.lorem.sentence(),
      );

      const jobberWelcomeElement =
        await onBoardingScreen.getJobberWelcomePage();

      expect(jobberWelcomeElement).toBePresent();

      await onBoardingScreen.clickNextButton();

      const jobberWelcomeElement1 =
        await onBoardingScreen.getManagBusinessOntheGoPage();

      expect(jobberWelcomeElement1).toBePresent();

      await onBoardingScreen.clickNextButton();
      await driver.pause(1000);
      const jobberWelcomeElement2 =
        await onBoardingScreen.getCutDownAdminWorkPage();

      expect(jobberWelcomeElement2).toBePresent();

      await onBoardingScreen.clickNextButton();
      await driver.pause(1000);
      const jobberWelcomeWinMOreElement =
        await onBoardingScreen.getWinMoreWorkPage();

      expect(jobberWelcomeWinMOreElement).toBePresent();

      await onBoardingScreen.clickNextButton();
      await driver.pause(1000);

      const needToRequestPermission =
        await notificationPromptScreen.needToRequestPermission();

      if (needToRequestPermission) {
        await notificationPromptScreen.tapOnNotRightNowButton();
      }

      const needToRequestTimeTacking =
        await homeScreen.needToRequestTimeTracking();

      if (needToRequestTimeTacking) {
        await homeScreen.dismissTrackingPrompt();
      }
      const homeElement = await homeScreen.getBottomTabNavigationBar();

      expect(homeElement).toBePresent();
      await driver.pause(2000);
    });
  });
});
