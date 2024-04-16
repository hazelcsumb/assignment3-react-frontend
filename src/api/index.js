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
    Authorization: sessionStorage.getItem("jwt"),
  },
});

// Allow axios to intercept requests to update the jwt 
// (if a user logged out and logged in as someone else)
// This prevents old stale JWT's from being used if the user didn't log out correctly
// or if your app gets restarted and the old JWT is stuck in sessionStorage
api.interceptors.request.use(function (config) {
  config.headers.Authorization = sessionStorage.getItem("jwt");
  return config;
});
