import axios from "axios";

const axiosErrorHandler = (error: unknown) => {
    if(axios.isAxiosError(error)) {
        return  error.response?.data || error.response?.data.message || error.message;
    }
    else {
        return "An Unexpected Error";
    }
}

export default axiosErrorHandler;