const clickNextButton = async () => {
  return $(
    driver.isAndroid ? "id=Next" : '//XCUIElementTypeButton[@name="Next"]',
  ).click();
};
const getJobberWelcomePage = async () => {
  return $("id=full-carousel");
};

const getManagBusinessOntheGoPage = async () => {
  return $("id=full-carousel");
};

const getCutDownAdminWorkPage = async () => {
  return $("id=full-carousel");
};

const getWinMoreWorkPage = async () => {
  return $("id=full-carousel");
};
export const onBoardingScreen = {
  getJobberWelcomePage,
  getManagBusinessOntheGoPage,
  getCutDownAdminWorkPage,
  getWinMoreWorkPage,
  clickNextButton,
};
