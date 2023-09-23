import axios from "axios";
import { useQuery } from "react-query";

import HistoryCard from "../HistoryCard";

import {
  ADVERTISE_HISTORY_NONE_TEXT,
  HISTORY_ADVERTISE_TEXT,
} from "../../data/constants";
import LoadingSpinner from "../LoadingSpinner";

const URL = import.meta.env.VITE_REACT_APP_URL;

const AdvertiseHistoryBox = () => {
  const accessToken = localStorage.getItem("accessToken");

  const getAdvertiseHistory = async () => {
    const { data } = await axios.get(`${URL}/users/advertisehistory`, {
      headers: { Authorization: accessToken },
    });
    return data;
  };

  const advertiseHistoryList = useQuery(
    "advertiseHistoryList",
    getAdvertiseHistory
  );

  return (
    <>
      <div className="mt-10">
        <h3 className="pl-2">{HISTORY_ADVERTISE_TEXT}</h3>
        <ul className="h-52 p-4 border rounded-lg flex flex-row overflow-x-scroll scrollbar-hide">
          {!advertiseHistoryList.isLoading &&
            advertiseHistoryList.data.data.map((history, idx) => (
              <HistoryCard
                key={idx}
                name={history.ai}
                gold={history.ao}
                date={history.createdAt}
              />
            ))}
          {!advertiseHistoryList.isLoading &&
            advertiseHistoryList.data.data.length === 0 && (
              <>
                <a>{ADVERTISE_HISTORY_NONE_TEXT}</a>
              </>
            )}
          {advertiseHistoryList.isLoading && (
            <>
              <div className="relative">
                <LoadingSpinner />
              </div>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default AdvertiseHistoryBox;
