async function getNotificationPrompt() {
  return $("id=notification-prompt");
}

async function getEnableNotificationsButton() {
  return $("~Enable notifications");
}

async function getNotRightNowButton() {
  return $("~Do not enable notifications");
}

export const notificationPromptScreen = {
  needToRequestPermission: async () => {
    const element = await getNotificationPrompt();
    if (driver.isIOS) {
      await element.waitForExist({ timeout: 9000 }); // Wait for 5 seconds or adjust as needed
    }
    const isElementDisplayed = await element.isExisting();

    return isElementDisplayed;
  },

  tapOnEnableNotificationsButton: async () => {
    return (await getEnableNotificationsButton()).click();
  },

  tapOnNotRightNowButton: async () => {
    const button = await getNotRightNowButton();
    await button.click();
  },
};
