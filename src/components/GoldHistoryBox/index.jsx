import axios from "axios";
import { useQuery } from "react-query";

import HistoryCard from "../HistoryCard";

import {
  GOLD_HISTORY_NONE_TEXT,
  HISTORY_GOLD_TEXT,
} from "../../data/constants";

const URL = import.meta.env.VITE_REACT_APP_URL;

const GoldHistoryBox = () => {
  const accessToken = localStorage.getItem("accessToken");

  const getGoldHistory = async () => {
    const { data } = await axios.get(`${URL}/users/goldhistory`, {
      headers: { Authorization: accessToken },
    });
    return data;
  };

  const goldHistoryList = useQuery("goldHistoryList", getGoldHistory);

  return (
    <>
      <div className="mt-10">
        <h3 className="pl-2">{HISTORY_GOLD_TEXT}</h3>
        <ul className="h-52 p-4 border rounded-lg flex flex-row overflow-x-scroll scrollbar-hide">
          {!goldHistoryList.isLoading &&
            goldHistoryList.data.data.map((history, idx) => (
              <HistoryCard
                key={idx}
                name={history.influencerName}
                gold={history.gold}
                date={history.createdAt}
              />
            ))}
          {!goldHistoryList.isLoading &&
            goldHistoryList.data.data.length === 0 && (
              <>
                <a>{GOLD_HISTORY_NONE_TEXT}</a>
              </>
            )}
        </ul>
      </div>
    </>
  );
};

export default GoldHistoryBox;
