const URL = import.meta.env.VITE_REACT_APP_URL;

import axios from "axios";

export const fetchAdsList = async () => {
  const response = await axios.get(
    `/Inappapi/web_ads_list?apikey=${
      import.meta.env.VITE_REACT_APP_APIKEY
    }&appcode=${import.meta.env.VITE_REACT_APP_CODE}`,
    {}
  );
  return response.data;
};

export const joinAd = async ({ adId, userIP, userNetworkType, uid, id }) => {
  const response = await axios.post("/Inappapi/ads_join", {
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
