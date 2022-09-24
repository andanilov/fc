import axios from "axios";
import toast from "react-hot-toast";
import config from "../../config.json";

axios.defaults.baseURL = config.apiEndPoint;

axios.interceptors.response.use((res) => res, (error) => {
    const status = error?.response?.status;
    const isExpected = status && status >= 400 && status < 500;
    !isExpected && console.log(error.response.message);
    toast.error("This is an error!");
    return Promise.reject(error);
});

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

export default httpService;
