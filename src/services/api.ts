import axios, { Axios } from "axios";

export const axiosConfig:Axios = axios.create({
    baseURL:process.env.REACT_APP_BASE_API,
})