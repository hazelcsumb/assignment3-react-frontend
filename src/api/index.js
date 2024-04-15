import axios from "axios";
import { baseURL } from "../Constants";

export const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    'Authorization': sessionStorage.getItem("jwt"),
  },
});
