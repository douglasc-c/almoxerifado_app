import axios from 'axios'
import {Platform} from 'react-native'

const api = axios.create( {
    baseURL: 'http://127.0.0.1:8000/', //URL DEV
    // baseURL: 'http://68.183.151.225/', //URL PROD
})

export default api