import axios from 'axios'
import { AuthenticationManager } from './AuthenticationManager';

export class RequestHelper {

    static get(url) {
        return RequestHelper.axiosInstance.get(url,
            { headers: RequestHelper.getHeaders() });
    }

    static post(url, data) {
        return RequestHelper.axiosInstance.post(url, data,
            { headers: RequestHelper.getHeaders() });
    }

    static put(url, data) {
        return RequestHelper.axiosInstance.put(url, data,
            { headers: RequestHelper.getHeaders() });
    }

    static delete(url, data) {
        return RequestHelper.axiosInstance.delete(url,
            { headers: RequestHelper.getHeaders() });
    }

    static getHeaders() {
        return AuthenticationManager.hasToken() ? { 
                'Authorization': AuthenticationManager.getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
            : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            };
    }
}

RequestHelper.axiosInstance = axios.create({
    timeout: 3000,
    headers: {}
});
