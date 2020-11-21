import axios from "axios";

export default axios.create({
    baseURL: "https://donatii-backend.herokuapp.com",
    headers: {
        "Content-type": "application/json"
    }
});
