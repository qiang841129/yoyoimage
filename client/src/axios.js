import axios from 'axios'


let instance = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})

instance.interceptors.request.use(
    config => {
        return config;
    },
    err => {
        return Promise.reject(err);
    }
)

instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error.response);
    }
)

export default {
    imageList() {
        return instance.get('/api/img/list/');
    }
}