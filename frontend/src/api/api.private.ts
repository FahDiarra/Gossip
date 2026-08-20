import axios from "axios";
import appConfig from "@/config/appConfig.ts";

const apiPrivate = axios.create({
    baseURL: appConfig.apiBaseUrl,
});

apiPrivate.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiPrivate;