import axios from 'axios'

const axiosInstance = axios.create()
const API: string = import.meta.env.VITE_API
axiosInstance.defaults.baseURL = API

export default axiosInstance
