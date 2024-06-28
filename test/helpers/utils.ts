import { closeiOSKeyboardByClickingDone } from "./ios";

function addTestModifierToEmail(email: string): string {
  // Split the email into local part and domain part based on the '@' symbol
  const [localPart, domain] = email.split("@");

  // Add 'epoch time' before the '@' symbol and concatenate the domain
  const modifiedEmail =
    `${localPart}` + getCurrentTimestampInEpoch() + `@${domain}`;

  return modifiedEmail;
}

function getCurrentTimestampInEpoch(): number {
  const currentDate = new Date();
  const timestampInMilliseconds = currentDate.getTime();
  const timestampInSeconds = Math.floor(timestampInMilliseconds / 1000);

  return timestampInSeconds;
}

async function closeKeyboard() {
  if (driver.isIOS) {
    await closeiOSKeyboardByClickingDone();
  } else {
    await driver.hideKeyboard();
  }
}

export { addTestModifierToEmail, getCurrentTimestampInEpoch, closeKeyboard };
