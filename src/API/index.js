import axios from "axios";
export default axios.create(
  {
    baseURL: `${process.env.REACT_APP_CE_REACT_API_ENDPOINT}`,
    responseType: "json",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  } //headers: { common: { Authorization: `bearer ${AuthHelper.getToken()}` }
); // }
