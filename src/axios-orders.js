const { default: axios } = require("axios");

const instance = axios.create({
    baseURL: 'https://burger-builder-38272-default-rtdb.firebaseio.com/'
});

export default instance;
