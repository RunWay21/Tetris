import axios from 'axios';
import store from './store';
import actions from 'root/actions';

const axiosInstance = axios.create({
    baseURL: '/api',
    headers: { 'Content-Type': 'application/json' }
});

axiosInstance.interceptors.response.use(response => response, error => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        store.dispatch(actions.common.auth.logout());
    }
    return Promise.reject(error);
});

export default axiosInstance;
