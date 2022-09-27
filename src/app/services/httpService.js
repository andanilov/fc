import axios from "axios";
import toast from "react-hot-toast";
import mainConfig from "../../config.json";

axios.defaults.baseURL = mainConfig.apiEndPoint;

axios.interceptors.request.use((config) => {
    // If database is Firebase
    mainConfig.isFirebase && (config.url = (config.url[config.url.length - 1] === "/"
        ? config.url.slice(0, -1)
        : config.url
    ) + ".json");

    return config;
}, (error) => Promise.reject(error));

const objsToObjArr = (data) => data
    ? Object.values(data).map((dt) => ({ ...dt }))
    : [];

axios.interceptors.response.use(
    (res) => {
        mainConfig.isFirebase && (res.data = { content: objsToObjArr(res.data) });
        return res;
    }, (error) => {
        // Check if errors occupied
        const status = error?.response?.status;
        const isExpected = status && status >= 400 && status < 500;
        !isExpected && console.log(error.response.message);
        toast.error("This is an error!");
        return Promise.reject(error);
    }
);

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

export default httpService;
