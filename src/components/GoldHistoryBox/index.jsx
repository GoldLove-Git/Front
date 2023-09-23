import axios from "axios";
import { useQuery } from "react-query";

import HistoryCard from "../HistoryCard";

import {
  HISTORY_ADVERTISE_TEXT,
  HISTORY_GOLD_TEXT,
} from "../../data/constants";

const URL = import.meta.env.VITE_REACT_APP_URL;

const GoldHistoryBox = ({ type }) => {
  const accessToken = localStorage.getItem("accessToken");

  const isType = type === "gold";

  const getGoldHistory = async () => {
    return axios.get(`${URL}/users/goldhistory`, {
      headers: { Authorization: accessToken },
    });
  };

  const getAdvertiseHistory = async () => {
    return axios.get(`${URL}/users/advertisehistory`, {
      headers: { Authorization: accessToken },
    });
  };

  const historyData = () => {
    if (isType) return getGoldHistory();
    return getAdvertiseHistory();
  };

  const historyList = useQuery("historyList", historyData);

  return (
    <>
      <div className="mt-10">
        <h3 className="pl-2">
          {isType ? HISTORY_GOLD_TEXT : HISTORY_ADVERTISE_TEXT}
        </h3>
        <ul className="h-52 p-4 border rounded-lg flex flex-row overflow-x-scroll scrollbar-hide">
          {!historyList.isLoading &&
            historyList.data.data.data.map((history) => (
              <HistoryCard
                name={
                  isType ? history.influencerName : history.advertisementName
                }
                gold={history.gold}
                date={history.date}
              />
            ))}
        </ul>
      </div>
    </>
  );
};

export default GoldHistoryBox;
