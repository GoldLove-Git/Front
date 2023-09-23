import { FILTER_GOLD, FILTER_VOTE, LANK_TEXT } from "../../data/constants";

import InfluencerCard from "../InfluencerCard";

const LankBox = ({ handleFilterClick, influencerLank }) => {
  return (
    <>
      <section className="w-screen px-10 mx-24 mb-10">
        <section className=" flex justify-between">
          <h2 className="text-xl font-semibold">{LANK_TEXT}</h2>
          <section>
            <button
              className="bg-white text-xs"
              onClick={() => handleFilterClick("gold")}
            >
              {FILTER_GOLD}
            </button>
            <button
              className="bg-white text-xs"
              onClick={() => handleFilterClick("vote")}
            >
              {FILTER_VOTE}
            </button>
          </section>
        </section>
        <ul className="w-pull h-80 py-4 px-5 border rounded-lg flex justify-center items-start">
          {!influencerLank.isLoading &&
            influencerLank.data.map((influencer, idx) => (
              <InfluencerCard
                key={idx}
                name={influencer.influencerName}
                img={influencer.influencerImg}
                gold={influencer.nowGold}
                onClick={() => handleCardClick(influencer)}
              />
            ))}
        </ul>
      </section>
    </>
  );
};

export default LankBox;
