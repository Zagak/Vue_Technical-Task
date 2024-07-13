import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.restful-api.dev',
});

export default instance;