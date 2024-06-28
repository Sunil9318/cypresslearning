async function getLoginButton() {
  return await $(
    "id=ATL-features.Landing.components.LandingButtons.LoginDefaultAccessibilityLabel-Button",
  );
}

async function getSignUpFreeButton() {
  return $("id=Sign Up Free");
}

export const landingScreen = {
  waitForDisplayed: async () => {
    return (await getLoginButton()).waitForDisplayed();
  },
  tapOnLoginButton: async () => {
    return (await getLoginButton()).click();
  },
  tapOnSignUpFreeButton: async () => {
    return (await getSignUpFreeButton()).click();
  },
};
