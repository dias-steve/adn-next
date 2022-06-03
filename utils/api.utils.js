import axios from 'axios';

// api pour stripe

export const apiInstance = axios.create({
    baseURL: '/api'
});