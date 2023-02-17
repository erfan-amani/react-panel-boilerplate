import ApiCall from "@/clients/apiCall";
import { BASE_URL } from "@/library/config";
import axios from "@/library/http";

const URL = "users";

const Add = (data) => {
  const req = {
    method: "post",
    url: BASE_URL + URL,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  };

  return axios(req);
};
const Edit = (data) => {
  const req = {
    method: "put",
    url: BASE_URL + URL,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  };

  return axios(req);
};

const GetOne = (id) => ApiCall("GET", `${URL}/${id}`);
const GetAll = (params) => ApiCall("GET", URL, null, params);
const Delete = (id) => ApiCall("DELETE", `${URL}/${id}`);
const Selector = (params) => ApiCall("GET", `${URL}/selector`, null, params);

export { URL, Add, Edit, GetOne, GetAll, Delete, Selector };
