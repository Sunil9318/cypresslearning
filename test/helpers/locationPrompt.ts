const getAllowLocationPermissionOnceButton = async () => {
  return $(
    driver.isAndroid
      ? '(*//android.widget.LinearLayout[3]/android.widget.Button[2] )[contains(@text,"Only this time")]'
      : "~Allow Once",
  );
};

async function allowLocationPermissionOnceIfDisplayed() {
  await driver.pause(2000);
  const allowButton = await getAllowLocationPermissionOnceButton();

  if (await allowButton.isDisplayed()) {
    await allowButton.click();
  }
}

export { allowLocationPermissionOnceIfDisplayed };
