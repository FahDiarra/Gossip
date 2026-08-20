import axios from "axios";
import appConfig from "@/config/appConfig.ts";

const apiPublic = axios.create({
    baseURL: appConfig.apiBaseUrl,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiPublic;