import client from './client'
import config from '../../tests.config'

const bookStoreAdd = async (token, userId, collectionOfIsbns) => {
  const response = await client.post(`BookStore/v1/Books`, {
    userId,
    collectionOfIsbns,
  }, 
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data,
  }
}

const bookStoreEdit = async (token, userId, isbn, new_isbn) => {
  const response = await client.post(`BookStore/v1/Books/${isbn}`, {
    userId,
    new_isbn,
  }, 
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data,
  }
}

const bookStoreGetList = async () => {
  const response = await client.get(`BookStore/v1/Books`, {})

  return {
    headers: response.headers,
    status: response.status,
    data: response.data,
  }
}

const bookStoreGet = async (isbn) => {
  const response = await client.get(`BookStore/v1/Book/?ISBN=${isbn}`, {})

  return {
    headers: response.headers,
    status: response.status,
    data: response.data,
  }
}

const bookStoreDelete = async (token, isbn, userId) => {
  const response = await client.delete(`BookStore/v1/Book`, {
    isbn,
    userId,
  }, 
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data,
  }
}

export default {
  bookStoreAdd: bookStoreAdd,
  bookStoreEdit: bookStoreEdit,
  bookStoreGetList: bookStoreGetList,
  bookStoreGet: bookStoreGet,
  bookStoreDelete: bookStoreDelete,
}
