import { constants } from "../helpers/constants";
import { closeKeyboard } from "../helpers/utils";

async function getSearchClientField() {
  return $("~Search clients");
}
const getFirstSearchedItem = async () => {
  return $(
    driver.isAndroid
      ? '//android.widget.ScrollView[@content-desc="Search Results"]/android.view.ViewGroup' +
          "/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[1]"
      : '(//XCUIElementTypeOther[@name="listItem"])[1]',
  );
};

const getFirstItemInClientList = async () => {
  return $(
    driver.isAndroid
      ? '//android.widget.ScrollView[@content-desc="clients list"]/android.view.ViewGroup' +
          "/android.view.ViewGroup[2]/android.view.ViewGroup[1]/android.view.ViewGroup[1]"
      : '(//XCUIElementTypeOther[@name="listItem"])[1]',
  );
};

const getTextFirstItemInClientList = async () => {
  return $(
    driver.isAndroid
      ? '//android.widget.ScrollView[@content-desc="clients list"]/android.view.ViewGroup' +
          "/android.view.ViewGroup[2]/android.view.ViewGroup[1]/android.view.ViewGroup[1]" +
          "/android.widget.TextView[1]"
      : '(//XCUIElementTypeOther[@name="listItem"])[1]',
  );
};

export const addClientScreen = {
  selectFirstClientInSearchList: async () => {
    const firstClientInList = await getFirstItemInClientList();
    await firstClientInList.waitForDisplayed();
    await addClientScreen.setClientNameConstants();
    await firstClientInList.click();
  },
  enterClientSearchTerm: async () => {
    const searchClientField = await getSearchClientField();

    await searchClientField.click();

    await searchClientField.setValue(
      constants.CLIENT_FIRSTNAME + " " + constants.CLIENT_SECONDNAME,
    );
    await driver.setImplicitTimeout(2000);
    await closeKeyboard();
  },
  setClientNameConstants: async () => {
    const textSectionFirstClientList = await getTextFirstItemInClientList();
    let name = "";
    if (driver.isAndroid) {
      name = await textSectionFirstClientList.getText();
    } else if (driver.isIOS) {
      name = await textSectionFirstClientList.getAttribute("label");
    }
    const clientName = name.split(" ");
    constants.CLIENT_FIRSTNAME = clientName[0];
    constants.CLIENT_SECONDNAME = clientName[1];
  },
};
