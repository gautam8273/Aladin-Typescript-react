import axios from 'axios';

// const baseURL = "http://10.0.4.26:10007/api"

const baseURL = process.env.REACT_APP_API_BASE_URL +
    process.env.REACT_APP_API_PREFIX

export const apiInstance = axios.create({
    baseURL,
    countryName: JSON.parse(localStorage.getItem("countryData") || ""),
    headers: { Authorization: localStorage.getItem("loginData") }
})



