import axios from "axios";

const api = axios.create({
    baseURL: 'https://shaw-partners-backend.herokuapp.com'
})

export {api}