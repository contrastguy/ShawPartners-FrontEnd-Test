import axios from "axios";

const api = axios.create({
    baseURL: 'https://shaw-partners-backend.herokuapp.com',
    // url:'"https://api.github.com/'
})

export {api}