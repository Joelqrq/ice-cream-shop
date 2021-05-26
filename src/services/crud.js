import axios from "axios";

export const create = (values) => {
    axios.post("http://localhost:3001/test", values, {withCredentials: true}).then((res) => console.log(res))
};

export const test = () => {
    axios.get("http://localhost:3001/gd", {withCredentials: true}).then((res) => console.log(res))
};