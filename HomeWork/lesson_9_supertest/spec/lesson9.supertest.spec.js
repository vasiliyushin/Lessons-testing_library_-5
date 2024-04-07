import {test} from "@jest/globals";
import config from "../../tests.config";
import bookServiceSupertest from "../pageobjects/bookServiceSupertest";
import UserServiceSupertest from "../pageobjects/userServiceSupertest";
import expect from "expect";

let uuid = '';
let token = '';
let isbn;
let new_isbn;

describe('Авторизация', () => {
    // Чтобы авторизоваться, сначала надо создать пользователя
    test('Создание пользователя', async () => {
        const respCreateUser = await UserServiceSupertest.createUser(config.credentials);
        
        expect(respCreateUser.status).toEqual(201);
        
        // Запоминаем UUID для дальнейшей работы
        uuid =respCreateUser.body.userID;
    })

    // Авторизуемся:
    test('Авторизация под созданным пользователем', async () => {
        const respAuthorized = await UserServiceSupertest.authorized(config.credentials);
        
        expect(respAuthorized.status).toEqual(200);
    })

    // Генерируем токен
    test('Генерация токена', async () => {
        const resGenerateToken = await UserServiceSupertest.generateToken(config.credentials);
        
        expect(resGenerateToken.status).toEqual(200);
        
        // Запоминаем полученный токен
        token = resGenerateToken.body.token;
    })
});

describe('Получаем список книг, чтобы взять ISBN', () => {
    // Чтобы привязать к пользователю книгу, сначала получаем имеющиеся ISBN
    test('Получение списка книг и фиксация нужных ISBN', async () => {
        const resBooksCollection = await bookServiceSupertest.bookStoreGetList();

        expect(resBooksCollection.status).toEqual(200);

        // Фиксирует ISBN первой книги. Её будем привязывать к юзеру
        isbn = resBooksCollection.body.books[0].isbn;
        // Фиксирует ISBN второй книги. Её привяжем при изменении
        new_isbn = resBooksCollection.body.books[1].isbn;
    })
});

describe('Создание привязки книги к пользователю', () => {
    test('Привязываем книгу к пользоватею', async () => {
        const resAddBook = await bookServiceSupertest.bookStoreAdd({
            "userId": uuid,
            "collectionOfIsbns": [
                {
                    "isbn": isbn
                }
            ]
        }, token);

        expect(resAddBook.status).toEqual(201);
    })
});


describe('Обновление книги', () => {
    test('Обновили информацию о книге', async () => {
        const resBookUpdate = await bookServiceSupertest.bookStoreEdit({
            "userId": uuid,
            "isbn": new_isbn
        }, isbn, token);

        expect(resBookUpdate.status).toEqual(200);
        expect(resBookUpdate.body.books[0].isbn).toEqual(new_isbn);
    })
});

describe('Получение информации о книге', () => {
    test('Получили информацию о книге', async () => {
        const resBookInfo = await bookServiceSupertest.bookStoreGet(new_isbn);

        expect(resBookInfo.status).toEqual(200);
        expect(resBookInfo.body.title).toEqual('Learning JavaScript Design Patterns');
        expect(resBookInfo.body.pages).toEqual(254);
    })
});

describe('Удаление привязки книги к пользователю', () => {
    test('Отвязали книгу от пользователя', async () => {
        const resBookDelete = await bookServiceSupertest.bookStoreDelete({
            "isbn": new_isbn,
            "userId": uuid
        }, token);

        expect(resBookDelete.status).toEqual(204);
    })
});
