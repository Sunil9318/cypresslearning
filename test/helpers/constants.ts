import { overrides } from "../../.envs.override";
import * as faker from "faker";

const invalidEmail = `invalid.email@%${faker.random.word()}.com`;
export const defaultSignupValues = {
  INVALID_USER: invalidEmail,
  INVALID_PASSWORD: faker.internet.password(5, false, /[a-zA-Z]/),
};

const randomAmount = (Math.random() * 50).toFixed(2);
export const defaultLoginValues = {
  LOGIN_USER: "appiumtest@example.com",
  LOGIN_PASSWORD: "appium7357",
  BAD_LOGIN_USER: "invaliduser@example.com",
  BAD_LOGIN_PASSWORD: "invalidpassword",
  LINE_ITEM_UNIT_PRICE: randomAmount,
};

export const createRequestValues = {
  REQUEST_TITLE_TEXT: faker.random.words(2),
  INSTRUCTIONS_TEXT: faker.random.words(4),
};

export const createInvoiceValues = {
  INVOICE_STATUS: "Awaiting Payment",
};

export const createJobValues = {
  JOB_TITLE_TEXT: faker.random.words(2),
  JOB_INSTRUCTION_TEXT: faker.random.words(4),
};

export const createQuoteValues = {
  JOB_TITLE_TEXT: faker.random.words(2),
  TASK_STATUS_AFTER_CREATION: "Awaiting Response",
};

const randomAddress = `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()}`;
export const createClientValues = {
  CLIENT_FIRSTNAME: faker.name.firstName(),
  CLIENT_SECONDNAME: faker.name.lastName(),
  CLIENT_PHONENUMBER: faker.phone.phoneNumberFormat(1),
  CLIENT_EMAIL: faker.internet.email(),
  CLIENT_ADDRESS: randomAddress,
  CLIENT_COMPANYNAME: faker.random.words(3),
};

export const DefaultTimeouts = {
  ELEMENT_LOAD_TIME: 3000,
  PAGE_TRANSITION_TIME: 6000,
  CLOCK_IN_TIMER: 6000,
};

export const createTaskValues = {
  TASK_TITLE: faker.random.words(2),
  TASK_DESCRIPTION: faker.random.words(4),
};

export const constants = {
  ...defaultSignupValues,
  ...defaultLoginValues,
  ...createClientValues,
  ...overrides,
  ...createRequestValues,
  ...createQuoteValues,
  ...createJobValues,
  ...DefaultTimeouts,
  ...createTaskValues,
  ...createQuoteValues,
  ...createInvoiceValues,
};
