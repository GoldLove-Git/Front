const URL = import.meta.env.VITE_REACT_APP_URL;

import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

import InfluencerCard from "../components/InfluencerCard";
import Modal from "../components/Modal/Modal"; // Assuming Modal component is in the components folder
import LankBox from "../components/LankBox";

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [filter, setFilter] = useState("gold");

  const handleCardClick = (influencer) => {
    setSelectedInfluencer(influencer);
    console.log("Card clicked", influencer); // 콘솔 로그 추가
    setIsModalOpen(true);
  };

  const handleFilterClick = (value) => {
    setFilter(value);
  };

  const getInfluencerList = async () => {
    const { data } = await axios.get(`${URL}/influencers/list`);
    return data;
  };

  const influencerList = useQuery("influencerList", getInfluencerList);

  const getInfluencerGold = async () => {
    const rank = 3;

    const { data } = await axios.get(`${URL}/influencers/rank/gold/${rank}`);
    return data;
  };

  const getInfluencerVote = async () => {
    const rank = 3;

    const { data } = await axios.get(`${URL}/influencers/rank/vote/${rank}`);
    return data;
  };

  const influencerGoldLank = useQuery("influencerGoldLank", getInfluencerGold);

  const influencerVoteLank = useQuery("influencerVoteLank", getInfluencerVote);

  return (
    <>
      <div className="w-screen h-screen pt-28 flex flex-col justify-start items-center">
        <LankBox
          handleFilterClick={handleFilterClick}
          influencerLank={
            filter === "gold" ? influencerGoldLank : influencerVoteLank
          }
        />
        <section>
          <ul className="px-24 flex flex-wrap justify-start items-start">
            {!influencerList.isLoading &&
              influencerList?.data?.map((influencer, idx) => (
                <InfluencerCard
                  key={idx}
                  id={influencer.influencerId}
                  name={influencer.influencerName}
                  img={influencer.influencerImg}
                  gold={influencer.nowGold}
                  onClick={() => handleCardClick(influencer)}
                />
              ))}
          </ul>
        </section>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        influencer={selectedInfluencer}
        img={selectedInfluencer ? selectedInfluencer.influencerImg : null}
        id={selectedInfluencer ? selectedInfluencer.influencerId : null}
        name={selectedInfluencer ? selectedInfluencer.influencerName : null}
      />
    </>
  );
};

export default MainPage;
