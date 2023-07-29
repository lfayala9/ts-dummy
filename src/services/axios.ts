import axios from 'axios'

const axiosInstance = axios.create()
// const API = process.env.REACT_APP_API
axiosInstance.defaults.baseURL = 'http://localhost:3002/api/v1'

export default axiosInstance
