import axios from 'axios';
import config from '../config';

const API = 'https://api.stripe.com/v1';

const Model = {
    list: function(limit) {
        return axios.get(`${API}/customers`, {
            headers: {
                'Authorization':`Bearer ${config.key}`
            }
        });
    },
    get: function(id) {
        return axios.get(`${API}/customers/${id}`, {
            headers: {
                'Authorization':`Bearer ${config.key}`
            }
        });
    },
    create: function(data) {
        return axios.get(`${API}/customers`, {
            data: data,
            headers: {
                'Authorization':`Bearer ${config.key}`
            }
        });
    },
    delete: function(id) {
        return axios.delete(`${API}/customers/${id}`, {
            headers: {
                'Authorization':`Bearer ${config.key}`
            }
        });
    },
    update: function(id, data) {
        return axios.get(`${API}/customers/${id}`, {
            data: data,
            headers: {
                'Authorization':`Bearer ${config.key}`
            }
        });
    }
}

export default Model;