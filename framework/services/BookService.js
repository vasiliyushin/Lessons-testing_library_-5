import supertest from 'supertest'
import { config } from '../config'

const getBooks = async () => {
  const response = await supertest(config.baseURL).get('/BookStore/v1/Books')
  return {
    headers: response.headers,
    status: response.status,
    data: response.body,
  }
}

const addBook = async ({ userId, isbn, token }) => {
  const response = await supertest(config.baseURL)
    .put(`/BookStore/v1/Books/${userId}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      userId,
      isbn,
    })
  return {
    headers: response.headers,
    status: response.status,
    data: response.body,
  }
}

const addListOfBooks = async ({ userId, isbns, token }) => {
  const payload = {
    userId,
    collectionOfIsbns: isbns.map(isbn => ({ isbn })),
  }

  const response = await supertest(config.baseURL)
    .post(`/BookStore/v1/Books`)
    .set('Authorization', `Bearer ${token}`)
    .set('Accept', 'application/json')
    .send(payload)
  return {
    headers: response.headers,
    status: response.status,
    data: response.body,
  }
}

export default {
  getAll: getBooks,
  add: addBook,
  addList: addListOfBooks,
}
