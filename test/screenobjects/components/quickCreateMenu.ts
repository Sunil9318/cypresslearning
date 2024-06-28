class QuickCreateMenu {
  public async waitForDisplayed() {
    await this.plusIcon.waitForDisplayed();
  }

  public async tapOnPlusMenu() {
    await this.plusIcon.click();
  }

  public async tapOnJobIcon() {
    await this.jobIcon.click();
  }

  public async tapOnClientIcon() {
    await this.clientIcon.click();
  }

  public async getRequestIcon() {
    return this.requestIcon;
  }

  public async tapOnRequestIcon() {
    await this.requestIcon.click();
  }

  public async tapOnQuoteIcon() {
    await this.quoteIcon.click();
  }

  private get plusIcon() {
    return $("id=GlobalAddButton");
  }
  private get clientIcon() {
    return $("id=QuickCreate-clients");
  }
  private get quickCreateMenu() {
    return $("~Modal content");
  }

  private get jobIcon() {
    return this.quickCreateMenu.$("~Create Job");
  }
  private get requestIcon() {
    return this.quickCreateMenu.$("id=QuickCreate-request");
  }
  private get taskIcon() {
    return $("id=QuickCreate-task");
  }
  public async tapOnTaskIcon() {
    await this.taskIcon.click();
  }

  private get quoteIcon() {
    return this.quickCreateMenu.$("~Create Quote");
  }

  private get invoiceIcon() {
    return $("id=QuickCreate-invoice");
  }
  public async tapOnInvoiceIcon() {
    await this.invoiceIcon.click();
  }
}

export const quickCreateMenu = new QuickCreateMenu();
