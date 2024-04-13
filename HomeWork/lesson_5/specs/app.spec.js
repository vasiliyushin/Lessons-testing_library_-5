import { nameIsValid, fullTrim, getTotal } from "../src/app.js";

/*
ChatGPT подсказал, что функция nameIsValid должна отдать true, если входное значение проходит по кретериям:

    1. Переменная name должна существовать и не быть пустой (name должно быть true).
    2. Длина переменной name должна быть больше или равно 2 символам.
    3. Переменная name должна содержать только символы от a до z (строчные буквы латинского алфавита).

*/

//тесты на функцию nameIsValid
describe('Test name user', () => {
  
  //успешная проверка
  it('case 1: successful check', () => {
    const result = nameIsValid('test')
    expect(result).toBe(true)
  })
  
  //проверка,что будет ошибка, если ввели пустое значение
  it('case 2: empty value', () => {
    const result = nameIsValid('')
    expect(result).toBe(false)
  })

  //проверка, что будет ошибка, если ввели менее двух символов
  it('case 3: not many letters', () => {
    const result = nameIsValid('T')
    expect(result).toBe(false)
  })

  //проверка, что будет ошибка, если используем цифры
  it('case 4: enter numbers', () => {
    const result = nameIsValid('Test123')
    expect(result).toBe(false)
  })

  //проверка, что будет ошибка, если используем буквы верхнего регистра
  it('case 5: big letters', () => {
    const result = nameIsValid('Test')
    expect(result).toBe(false)
  })

})

/*
ChatGPT подсказал, что функция fullTrim принимает текст и удаляет все пробелы из этого текста. 
Если переданное значение text равно null или undefined, то функция заменяет его на пустую строку "".
*/

//тесты на функцию fullTrim
describe('Test full trim', () => {
  
  //функция удаляет пробелы из текста
  it('case 1: removing spaces from text', () => {
    const result = fullTrim(' t es t ')
    expect(result).toBe('test')
  })

  //функция удаляет пробелыиз пустого значения
  it('case 2: removing spaces from empty', () => {
    const result = fullTrim('')
    expect(result).toBe('')
  })

  //функция обрабатывает undefined
  it('case 3: removing spaces from undefined', () => {
    let a
    const result = fullTrim(a)
    expect(result).toBe('')
  })

})

/*
ChatGPT подсказал,что функция getTotal принимает массив items, где каждый элемент представляет собой объект со свойствами price (цена) и quantity (количество). 
Сначала происходит редуцирование массива items, где для каждого элемента производится вычисление произведения цены на количество, 
и полученные значения суммируются. Затем из общей суммы вычитается скидка, которая задается в процентах.

Условия:
    1. Скидка должна быть числом
    2. Процент скидки не может быть отрицательным
    3. Процент скидки не может быть больше 100
*/

//тесты на функцию getTotal
describe('test getTotal', () => {
  
  //тестовые даннные для позитивных сценариев
  const testCasesPositive = [
    //тестовые данные для ситуации когда используется скидка 10%
    {
      name: 'case 1: valid discount',
      products: [
        { name: 'Товар1', quantity: 3, price: 1 },
        { name: 'Товар2', quantity: 5, price: 1 },
      ],
      discount: 10,
      expected: {
        total: 7.2,
      },
    },
    //тестовые данные для ситуации когда скидки нет
    {
      name: 'case 2: discount is 0',
      products: [
        { name: 'Товар1', quantity: 3, price: 1 },
        { name: 'Товар2', quantity: 5, price: 1 },
        ],
        discount: 0,
        expected: {
          total: 8,
        },
      },
  ]

  //Проверка позитивных сценариев
  test.each(testCasesPositive)('$name', ({ products, discount, expected }) => {
    const result = getTotal(products, discount)
    expect(result).toBe(expected.total)
  })

  const testCasesNegative = [
    //тестовые данные для проверки, что будет верная ошибка, если указать скидку размер которой меньше нуля
    {
      name: 'case 3: discount less than zero',
      products: [
        { name: 'Товар1', quantity: 3, price: 1 },
        { name: 'Товар2', quantity: 5, price: 1 },
      ],
      discount: -10,
      expectedError: 'Процент скидки не может быть отрицательным',
    },
    //тестовые данные для проверки, что будет верная ошибка, если указать скидку размер которой больше 100% 
    {
      name: 'case 4: invalid discount over 100%',
      products: [
        { name: 'Товар1', quantity: 3, price: 1 },
        { name: 'Товар2', quantity: 5, price: 1 },
      ],
      discount: 110,
      expectedError: 'Процент скидки не может быть больше 100',
    },
    //тестовые данные для проверки, что будетверная ошибка, если вместо скидки указать не числовое значение
    {
      name: 'case 5: invalid discount not a number',
      products: [
        { name: 'Товар1', quantity: 3, price: 1 },
        { name: 'Товар2', quantity: 5, price: 1 },
      ],
      discount: true,
      expectedError: 'Скидка должна быть числом',
    },
  ]

   //Проверка негативных сценариев
   test.each(testCasesNegative)('$name', ({ products, discount, expectedError }) => {
    expect(() => 
      getTotal(products, discount)
    ).toThrow(expectedError)
  })

})
