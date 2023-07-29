import axios from 'axios'

const axiosInstance = axios.create()
axiosInstance.defaults.baseURL = process.env.REACT_APP_API

export default axiosInstance
