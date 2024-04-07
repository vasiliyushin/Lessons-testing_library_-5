import supertest from "supertest";
import config from "../../tests.config";

const {url} = config;

const UserServiceSupertest = {
    // Авторизация пользователя
    authorized: (payload) => {
        return supertest(url)
            .post('/Account/v1/Authorized')
            .set('Accept', 'application/json')
            .send(payload)
    },
    
    // Генерация токена
    generateToken: (payload) => {
        return supertest(url)
            .post('/Account/v1/GenerateToken')
            .set('Accept', 'application/json')
            .send(payload)
    },

    // Добавление нового пользователя
    createUser: (payload) => {
        return supertest(url)
            .post('/Account/v1/User')
            .set('Accept', 'application/json')
            .send(payload)
    },

    // Получение данных о пользователе
    getUser: (userId, token) => {
        return supertest(url)
            .get(`/Account/v1/User/${userId}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send()
    },
    
    // Удаление пользователя
    removeUser: (uuid, token) => {
        return supertest(url)
            .del(`/Account/v1/User/${uuid}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send()
    }
}

export default UserServiceSupertest;
