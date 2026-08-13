import axios from "axios";
import appConfig from "@/config/appConfig.ts";

const apiPublic = axios.create({
    baseURL: appConfig.apiBaseUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiPublic;