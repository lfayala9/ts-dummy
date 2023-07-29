import axios from 'axios'

const axiosInstance = axios.create()
const API = process.env.REACT_APP_API
axiosInstance.defaults.baseURL = API

export default axiosInstance
