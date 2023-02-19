import axios from "axios";

const baseURL = process.env.REACT_APP_BASE;

const postRequest = async (body, query, params, token, endPoint) => {
  return await axios.post(
    `${baseURL}/${endPoint}${params ? params : ""}`,
    body,
    {
      params: query,
      headers: {
        "Accept": "json",
        "origin":"",
        "x-requested-with":""
      }
    },
  );
};

const getRequest = async (query, params, token, endPoint) => {
  return await axios.get(`${baseURL}/${endPoint}${params ? params : ""}`, {
    params: query,
    headers: {
      "Accept": "json",
      "origin":"",
      "x-requested-with":""
    },
    responseType : query?.responseType
  });
};

const delRequest = async (query, params, token, endPoint) => {
  return await axios.delete(`${baseURL}/${endPoint}${params ? params : ""}`, {
    params: query,
    headers: {
      "Accept": "json",
      "origin":"",
      "x-requested-with":""
    },
  });
};

const putRequest = async (body, query, params, token, endPoint) => {
  return await axios.put(
    `${baseURL}/${endPoint}${params ? params : ""}`,
    body,
    {
      params: query,
      headers: {
        "Accept": "json",
        "origin":"",
        "x-requested-with":""
      },
    }
  );
};

export { postRequest, getRequest, delRequest, putRequest };
