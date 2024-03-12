import axios from 'axios'
import { config } from '../config'

const client = axios.create({
  baseURL: config.baseURL,
  validateStatus: () => true,
})

export default client
