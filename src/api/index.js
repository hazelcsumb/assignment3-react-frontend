import axios from "axios";
import { baseURL } from "../Constants";

/*
 *
 * Axios API
 * https://axios-http.com/docs/intro
 *
 * GET call
 * let response = await api.get(`${baseURL}/some/route`);
 *
 * POST call
 * response = await api.post(`${baseURL}/some/route`, body);
 * https://axios-http.com/docs/post_example
 *
 * The data is stored in response.data
 * setData(response.data);
 *
 * DELETE call
 * api.delete("/some/route");
 *
 * PUT call
 * api.put("/some/route");
 *
 * View sample code in src/student/ScheduleView.js to see how it is used
 * with try/catch blocks and async/await
 *
*/
export const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    'Authorization': sessionStorage.getItem("jwt"),
  },
});
