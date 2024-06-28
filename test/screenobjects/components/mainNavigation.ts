// main navigation isn't its own screen, but we'll use its elements
// from all over in the test suite, so make it reusable.

class MainNavigation {
  public async waitForDisplayed() {
    await this.bottomNav.waitForDisplayed();
  }

  public async tapOnSearchTab() {
    await this.bottomSearchButton.click();
  }

  public async tapOnHomeTab() {
    await this.bottomHomeButton.click();
  }

  public async tapOnScheduleTab() {
    await this.bottomScheduleButton.click();
  }

  public async tapOnTimesheetTab() {
    await this.bottomTimesheetButton.click();
  }

  // set up a top-level scope to make sure we're only finding
  // elements on the expected screen!
  private get bottomNav() {
    return $("~Bottom Tab Navigation Bar");
  }

  private get bottomHomeButton() {
    return this.bottomNav.$("id=HomeTab");
  }

  private get bottomSearchButton() {
    return this.bottomNav.$("id=SearchTab");
  }

  private get bottomScheduleButton() {
    return this.bottomNav.$("id=SCHEDULETab");
  }

  private get bottomTimesheetButton() {
    return this.bottomNav.$("id=TimesheetTab");
  }
}

export const mainNavigation = new MainNavigation();
