import axios from "axios";

export default axios.create({
    baseURL: "http://bogdanbarbu.com:3001",
    headers: {
        "Content-type": "application/json"
    }
});
