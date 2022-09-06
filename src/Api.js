import axios from "axios";

export const createTinyUrl = async (body) => {
  try {
    let res = await axios.post(`${process.env.REACT_APP_API_URL}`, body);
    return res.data;
  } catch (e) {
    return e.response.data;
  }
};

export const fetchTinyUrls = async (body) => {
  try {
    let res = await axios.get(`${process.env.REACT_APP_API_URL}`);
    return res.data;
  } catch (e) {
    return e.response.data;
  }
};
