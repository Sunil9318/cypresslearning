import Gestures from "../helpers/Gestures";
import { closeiOSKeyboardByClickingDone } from "../helpers/ios";
import { constants } from "../helpers/constants";
import { closeKeyboard } from "../helpers/utils";

async function getFirstName() {
  return $("id=firstName");
}

async function getLastName() {
  return $("id=lastName");
}

async function getAddCompanyNameButton() {
  return $("id=ATL-CompanyName-Button");
}

async function getAddCompanyNameField() {
  return $("id=CompanyNameInput");
}

async function getAddPhoneNumber() {
  return $("id=ATL-AddPhoneNumber-Button");
}

async function getPhoneNumber() {
  return $("id=input-phone-number");
}

async function getNewAddEmail() {
  return $("id=ATL-AddEmail-Button");
}

async function getAddEmailAddress() {
  return $("id=EmailAddress");
}

async function getPropertyAddress() {
  return $("~Property address");
}

const allowLocationPermissionOnce = async () => {
  return $(
    driver.isAndroid
      ? '(*//android.widget.LinearLayout[3]/android.widget.Button[2] )[contains(@text,"Only this time")]'
      : "~Allow Once",
  );
};

async function getLocationSearchListItem() {
  return $("id=AddressStreet2");
}

async function getSave() {
  return $("id=features.Client.views.ClientCreate.save");
}

export const newClientScreen = {
  createContact: async () => {
    await (await getFirstName()).setValue(constants.CLIENT_FIRSTNAME);
    await (await getLastName()).setValue(constants.CLIENT_SECONDNAME);
    await (await getAddCompanyNameButton()).click();
    await (
      await getAddCompanyNameField()
    ).setValue(constants.CLIENT_COMPANYNAME);
    await (await getAddPhoneNumber()).click();
    await (await getPhoneNumber()).setValue(constants.CLIENT_PHONENUMBER);
    await closeKeyboard();
    await (await getNewAddEmail()).click();
    const emailAddressField = await getAddEmailAddress();
    await emailAddressField.setValue(constants.CLIENT_EMAIL);
    if (driver.isAndroid) {
      await driver.hideKeyboard();
      await emailAddressField.waitForDisplayed();
    } else {
      await closeiOSKeyboardByClickingDone();
    }

    await Gestures.swipeUp(1);
    const propertyAddressField = await getPropertyAddress();
    await propertyAddressField.click();
    await (await allowLocationPermissionOnce()).click();
    await propertyAddressField.setValue(constants.CLIENT_ADDRESS);
    await (await getLocationSearchListItem()).click();
  },
  tapOnSave: async () => {
    const saveButton = await getSave();
    await saveButton.waitForDisplayed({ timeout: constants.ELEMENT_LOAD_TIME });
    await saveButton.click();
    driver.setImplicitTimeout(5000);
  },
};
