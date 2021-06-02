import axios from "axios";

const endpoint = process.env.NODE_ENV === "development" ? "http://localhost:3000/v1/api" : "https://ice-cream-inventory.herokuapp.com/v1/api";

export const instance = axios.create({
    baseURL: endpoint,
    headers: {
        "Content-Type": "application/json"
    },
});