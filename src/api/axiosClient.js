import axios from "axios";
import queryString from "query-string";

import apiConfig from "./apiConfig";

const axiosClient = axios.create({
    baseURL: apiConfig.baseUrl,
        headers:{ Authorization : apiConfig.apiKey},
        paramsSerializer: params => queryString.stringify({...params})
})

axiosClient.interceptors.request.use(async (config) => config)

axiosClient.interceptors.response.use((response) => {
    if(response && response.data){
        return response.data
    }
    return response
},(error) => {
    return error
})

export default axiosClient