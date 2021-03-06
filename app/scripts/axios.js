import axios from 'axios'

const huntHelperApi = axios.create({
  baseURL: 'https://localhost.ssl:5000',
  headers: {
    Accept:         'application/vnd.hunthelper.com; version=1',
    'Content-Type': 'application/json; charset=utf-8',
  },
  // timeout in milliseconds
  timeout: 10000,
})

export default huntHelperApi
