import axios from "axios";
export default axios.create(
  {
    baseURL: `https://localhost:44324/api`,
    responseType: "json",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  } //headers: { common: { Authorization: `bearer ${AuthHelper.getToken()}` }
); // }
