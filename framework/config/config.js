import 'dotenv/config'

const config = {
  baseURL: process.env.TEST_BASE_API_URL,
  userId: process.env.TEST_USER_ID,
  username: process.env.TEST_USERNAME,
  password: process.env.TEST_PASSWORD,
}

// если хотим задать значения по-умолчанию, можно использовать оператор ??
export default Object.freeze(config)
