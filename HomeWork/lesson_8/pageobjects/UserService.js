import client from './client'
import config from '../../tests.config'

const getUser = async (userId, token) => {
  const response = await client.get(`${config.url}Account/v1/User/${userId}`, {
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

const createUser = async (userName, password ) => {
  const response = await client.post(`${config.url}Account/v1/User`, {
    userName,
    password,
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data,
  }
}

const removeUser = async (userId, token) => {
  const response = await client.delete(`${config.url}Account/v1/User/${userId}`, {
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

const generateToken = async (userName, password) => {
  const response = await client.post(`${config.url}Account/v1/GenerateToken`, {
    userName,
    password,
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data,
  }
}

const authorized = async (userName, password) => {
  const response = await client.post(`${config.url}Account/v1/Authorized`, {
    userName,
    password,
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data,
  }
}

export default {
  get: getUser,
  create: createUser,
  remove: removeUser,
  generateToken: generateToken,
  authorized: authorized,
}
