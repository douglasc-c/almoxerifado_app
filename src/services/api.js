import axios from 'axios'
import {Platform} from 'react-native'

const api = axios.create( {
    // baseURL: 'http://127.0.0.1:8000/', //URL DEV
    baseURL: 'http://161.35.113.179/', //URL PROD
})

export default api