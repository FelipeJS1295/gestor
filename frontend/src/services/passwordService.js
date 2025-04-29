import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/passwords/';

export const getPasswords = () => {
    return axios.get(API_URL);
};

export const createPassword = (passwordData) => {
    return axios.post(API_URL, passwordData);
};

export const deletePassword = (id) => {
    return axios.delete(`http://127.0.0.1:8000/api/passwords/${id}/`);
};

export const updatePassword = (id, passwordData) => {
    return axios.put(`http://127.0.0.1:8000/api/passwords/${id}/`, passwordData);
};