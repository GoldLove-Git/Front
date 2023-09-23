const URL = import.meta.env.VITE_REACT_APP_URL;

import axios from "axios";

export const fetchAdsList = async () => {
  const response = await axios.get(`${URL}/users/adlist`);
  console.log(response.data);
  return response.data;
};

export const joinAd = async ({ adId, userIP, userNetworkType, uid, id }) => {
  const response = await axios.post(`${URL}/users/joinAd`, {
    apikey: `${import.meta.env.VITE_REACT_APP_APIKEY}`,
    ac: `${import.meta.env.VITE_REACT_APP_CODE}`,
    ai: adId,
    ap: userIP,
    net: userNetworkType,
    uid: uid,
    pub: "",
    ak: id,
  });
  return response.data;
};
