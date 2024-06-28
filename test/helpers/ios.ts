// This function explanation is here: https://medium.com/@onur.polattimur/close-ios-keyboard-by-tapping-done-in-appium-webdriverio-ba8048b6838a
// Sometimes the driver.hideKeyboard() doesn't work
async function closeiOSKeyboardByClickingDone(): Promise<void> {
  const oldContext = await driver.getContext();
  await driver.switchContext("NATIVE_APP");
  const altDone = await driver.$("id=ATL-InputAccessory-Done");
  const done = await driver.$("id=Done");
  if (await done.isExisting()) {
    await done.click();
  } else if (altDone.isExisting()) {
    await altDone.click();
  }
  await driver.switchContext(oldContext as string);
}

// Helper function to close iOS prompts
async function closeiOSPromptBySelector(selector: string, timeout?: number) {
  const prompt = await $(`-ios predicate string:${selector}`);

  const isElementDisplayed = await prompt.waitForExist({ timeout });

  if (isElementDisplayed) {
    await prompt.click();
  }
}

export { closeiOSKeyboardByClickingDone, closeiOSPromptBySelector };
