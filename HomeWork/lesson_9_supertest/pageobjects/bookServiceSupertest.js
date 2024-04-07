import supertest from "supertest";
import config from "../../tests.config";

const {url} = config;

const bookServiceSupertest = {
    // Добавление новой книги
    bookStoreAdd: (payload, token) => {
        return supertest(url)
            .post('/BookStore/v1/Books')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(payload)
    },

    // Получение списка книг
    bookStoreGetList: () => {
        return supertest(url)
            .get('/BookStore/v1/Books')
            .set('Accept', 'application/json')
            .send()
    },
    
    // Обновление книги
    bookStoreEdit: (payload, isbn, token) => {
        return supertest(url)
            .put(`/BookStore/v1/Books/${isbn}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(payload)
    },

    // Получении информации о книге
    bookStoreGet: (isbn) => {
        return supertest(url)
            .get(`/BookStore/v1/Book?ISBN=${isbn}`)
            .set('Accept', 'application/json')
            // .set('Authorization', `Bearer ${authToken}`)
            .send()
    },

    // Удаление книги
    bookStoreDelete: (payload, token) => {
        return supertest(url)
            .del('/BookStore/v1/Book')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(payload)
    }
}

export default bookServiceSupertest;
