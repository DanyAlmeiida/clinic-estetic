import axios from "axios";
export default axios.create(
  {
    baseURL: "http://38.242.150.115:8200/api/",
    responseType: "json",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  } //headers: { common: { Authorization: `bearer ${AuthHelper.getToken()}` }
); // }
