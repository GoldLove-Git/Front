import { useEffect, useState } from "react";

import errorImg from "../../assets/image/error_img.jpeg";
import { GOLD_DENOMINATOR } from "../../data/constants";

const InfluencerCard = ({ name, img, gold, onClick }) => {
  const [percent, setPercent] = useState("0%");

  const denominator = GOLD_DENOMINATOR;

  const calculatePercentage = (gold, denominator) => {
    const newPercent = (gold / denominator) * 100;

    setPercent(`${newPercent.toFixed(2)}%`);
  };

  useEffect(() => {
    calculatePercentage(gold, denominator);
  }, []);

  return (
    <>
      <div className="px-4 sm:w-1/2 lg:w-1/3 overflow-hidden hover:scale-110">
        <div className="relative w-full h-72 rounded-lg overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src={img ? img : errorImg}
            alt="influencerImg"
            onClick={onClick}
          />
        </div>
        <div className="relative bottom-[70px]">
          <p className="w-fit ml-1.5 mb-1 py-1 px-2 rounded-lg text-white font-bold bg-zinc-950/70">
            {name}
          </p>
          <div className="mx-1.5">
            <div className="rounded-full border border-amber-400 p-1">
              <div
                className="flex h-6 items-center justify-center rounded-full bg-amber-400 text-[8px] font-extrabold leading-none"
                style={{ width: percent, height: "85%" }}
              ></div>
              <span className="p-1 font-bold text-white relative left-[42%]">
                {percent}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfluencerCard;
