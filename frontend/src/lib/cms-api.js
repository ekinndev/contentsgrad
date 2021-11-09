import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/cms/',
    timeout: 0,
    withCredentials: true,
});

instance.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    },
);

export default instance;
