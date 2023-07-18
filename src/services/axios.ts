import axios from 'axios'

const axiosInstance = axios.create()

axiosInstance.defaults.baseURL = 'http://localhost:3002/api/v1'

export default axiosInstance
