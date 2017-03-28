import qs from 'qs';
import axios from 'axios';
import _ from 'lodash';
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

        const _data = new URLSearchParams();

        _.forOwn(data, (value, key) => {
            if (key === 'metadata') {
                _.forOwn(value, (value, key) => {
                    _data.append(`metadata[${key}]`, value);
                });
            } else {
                _data.append(key, value);
            }
        });

        return axios.post(`${API}/customers`, _data, {
            headers: {
                'Authorization':`Bearer ${config.key}`,
                'Content-Type':'application/x-www-form-urlencoded'
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
        const _data = new URLSearchParams();

        _.forOwn(data, (value, key) => {
            if (key === 'metadata') {
                _.forOwn(value, (value, key) => {
                    _data.append(`metadata[${key}]`, value);
                });
            } else {
                _data.append(key, value);
            }
        });

        return axios.post(`${API}/customers/${id}`, _data, {
            headers: {
                'Authorization':`Bearer ${config.key}`,
                'Content-Type':'application/x-www-form-urlencoded'
            }
        });
    }
}

export default Model;