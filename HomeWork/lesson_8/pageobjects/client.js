import axios from 'axios'
import config from '../../tests.config'

const client = axios.create({
  baseURL: config.url,
  validateStatus: () => true,
})

export default client
