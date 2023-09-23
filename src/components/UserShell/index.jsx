import { useNavigate } from "react-router-dom";

import { LOGOUT, SAVING_GOLD } from "../../data/constants";

const UserShell = ({ userId, nickname, gold }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <>
      <div className="flex flex-col justify-start items-start flex-wrap">
        <div className="w-full p-6 border-2 rounded-lg flex flex-col justify-between items-start flex-wrap">
          <div className="w-full p-6 flex flex-row justify-between items-start flex-wrap">
            <div className="flex flex-row justify-start items-start flex-wrap">
              <section className="w-32 h-32 border rounded-full relative overflow-hidden ">
                <img />
              </section>
              <section className="p-5 flex flex-col justify-start items-start">
                <p>{userId}</p>
                <strong>{nickname}</strong>
              </section>
            </div>
            <section className="p-2 flex flex-col justify-start items-end">
              <p>{SAVING_GOLD}</p>
              <p className="sm:text-3xl lg:text-5xl font-extrabold text-orange-500">
                {gold}
              </p>
            </section>
          </div>
          <div className="w-full flex flex-row justify-end">
            <button onClick={() => handleLogout()}>
              <p className="text-xs text-slate-400 hover:text-slate-600">
                {LOGOUT}
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserShell;
