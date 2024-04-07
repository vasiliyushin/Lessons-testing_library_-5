import { faker } from '@faker-js/faker'

const config = {
  // Base url
  url: "https://bookstore.demoqa.com",
  credentials: {
    userName: faker.internet.email().toLowerCase(),
    password: "Otus_QA_JS_23/24!@#$%^"
  }
}

export default config;
