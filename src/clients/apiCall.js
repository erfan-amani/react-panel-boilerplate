import axios from "@/library/http";

const ApiCall = async (method, path, data, params, formatResult) => {
  return await axios({
    url: path,
    method,
    params,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data,
  }).then((res) => (formatResult ? formatResult(res) : res));
};

export default ApiCall;
