import {test, expect} from "@jest/globals";
import { faker } from '@faker-js/faker'
import UserService from "../pageobjects/UserService";
import config from "../tests.config";

//перед запуском тестов - генерируем ему логин и фиксируем в переменной 
const userName = faker.internet.email().toLowerCase()
//создал переменные, в которых буду фиксировать полученные данные для id пользователя и его токена
let uuid = '';
let token = '';

describe('Авторизация', () => {
    test('Создание пользователя', async () => {
      const respCreateUser = await UserService.create(userName, config.password)
      expect(respCreateUser.status).toEqual(201);
      //фиксируем id созданного пользователя, чтобы в дальнейшем запросить по нему данные
      uuid = respCreateUser.data.userID;
  });
    test('Авторизация', async () => {
      const respAuthorized = await UserService.authorized(userName, config.password)
      expect(respAuthorized.status).toEqual(200);
  });
});

describe('Получение информации о пользователе', () => {
    test('Генерация токена', async () => {
      const resGenerateToken = await UserService.generateToken(userName, config.password);
      expect(resGenerateToken.status).toEqual(200);
      //фиксируем полученный токен
      token = resGenerateToken.data.token;
      expect(resGenerateToken.data.token).not.toEqual(null)
    });

    test('Получаем данные существующего пользователя', async () => {
      const resGetInfo = await UserService.get(uuid, token);
      expect(resGetInfo.status).toEqual(200);
      expect(resGetInfo.data.userId).toEqual(uuid);
      expect(resGetInfo.data.username).toEqual(userName);
    })
});

describe('Удаление пользователя', () => {
    test('Удаление существующего пользователя', async () => {
        const resDelete = await UserService.remove(uuid, token);
        expect(resDelete.status).toEqual(204);
    })
});
