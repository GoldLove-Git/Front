import axios from "axios";
import { useQuery } from "react-query";

import GoldHistoryBox from "../components/GoldHistoryBox";
import UserShell from "../components/UserShell";

const URL = import.meta.env.VITE_REACT_APP_URL;

const Mypage = () => {
  const accessToken = localStorage.getItem("accessToken");

  const getUserInfo = async () => {
    const { data } = await axios.get(`${URL}/users/mypage`, {
      headers: { auth: accessToken },
    });
    return data;
  };

  const user = useQuery("user", getUserInfo);

  return (
    <>
      <div className="w-screen p-36">
        {!user.isLoading && (
          <UserShell
            userId={user.data.data.userId}
            nickname={user.data.datanickname}
            gold={user.data.data.gold}
          />
        )}
        <GoldHistoryBox type={"gold"} />
        <GoldHistoryBox type={"influencer"} />
      </div>
    </>
  );
};

export default Mypage;
