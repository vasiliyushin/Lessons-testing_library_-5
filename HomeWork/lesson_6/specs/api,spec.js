// Вариант 1:
// Напишите 5 апи-тестов на сервис bookstore
// https://bookstore.demoqa.com/swagger/
// Напишите АПИ-тесты:

//     Создание пользователя c ошибкой, логин уже используется
//     Создание пользователя c ошибкой, пароль не подходит
//     Создание пользователя успешно
//     Генерация токена c ошибкой
//     Генерация токена успешно

import fetch from 'node-fetch'

//функция по созданию пользователя
async function createUser(userName, password) {
  const response = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
      method: 'post',
      body: JSON.stringify({
          'userName': userName,
          'password': password
      }),
      headers: { 'Content-Type': 'application/json' }
  })
  return response
}

//функция по генерации токена
async function generateToken(userName, password) {
  const response = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
      method: 'post',
      body: JSON.stringify({
          'userName': userName,
          'password': password
      }),
      headers: { 'Content-Type': 'application/json' }
  })
  return response
}

//рандомная генерация числа, нужна чтобы подобрать уникальный логин пользователю
function randomNumber(random, delta) {
  return Math.round((Math.random() * random) + delta)
}

//тесты
describe('Набор апи-тестов на сервис bookstore', () => {
  test('Создание пользователя c ошибкой, логин уже используется', async () => {
      const response = await createUser('test', 'Otus_QA_JS_23/24!@#$%^')
      const data = await response.json()
      expect(response.status).toBe(406)
      expect(data.code).toBe('1204')
      expect(data.message).toBe('User exists!')
  }),

  test('Создание пользователя c ошибкой, пароль не подходит', async () => {
    const response = await createUser('test', 'badPassword') //тут передаем значение пароля, который не проходит по валидации 
    const data = await response.json()
    expect(response.status).toBe(400)
    expect(data.code).toBe('1300')
    expect(data.message).toBe("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.")
  }),

  test('Создание пользователя успешно', async () => {
    const userName = `test${randomNumber(9999, 0)}` //тут чтобы повысить вероятность использования уникального логина - добавляем к знаению test случайное число 
    const response = await createUser(userName, 'Otus_QA_JS_23/24!@#$%^')
    const data = await response.json()
    expect(response.status).toBe(201)
    expect(data.username).toBe(userName)
  }),

  test('Генерация токена c ошибкой', async () => {
    const response = await generateToken('test', 'badPassword') //указываем невалидную пару логин\пароль, что при генерации токена была ошибка
    const data = await response.json()
    expect(response.status).toBe(200)
    expect(data.status).toBe('Failed')
    expect(data.token).toBe(null)
  }),

  test('Генерация токена успешно', async () => {
    const userName = `test${randomNumber(99999, 99999)}` 
    createUser(userName, 'Otus_QA_JS_23/24!@#$%^') //создаем нового пользователя, чтобы затем получить для него токен в рамках этого теста
    const response = await generateToken(userName, 'Otus_QA_JS_23/24!@#$%^')
    const data = await response.json()
    expect(response.status).toBe(200)
    expect(data.status).toBe('Success')
    expect(data.token).not.toBe(null)
  })
})
