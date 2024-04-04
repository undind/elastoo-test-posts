import axios, { type AxiosInstance, type AxiosError } from 'axios'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
  }
})

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
