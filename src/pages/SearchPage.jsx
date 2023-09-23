const URL = import.meta.env.VITE_REACT_APP_URL;

import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axios from "axios";

import InfluencerCard from "../components/InfluencerCard";
import Modal from "../components/Modal/Modal"; // Assuming Modal component is in the components folder
import LoadingSnipper from "../components/LoadingSpinner";

import { SEARCH_DATA_NONE_TEXT } from "../data/constants";

const SearchPage = () => {
  const { influencerName } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [influencerList, setInfluencerList] = useState([]);
  console.log("searchName : ", searchName);

  useEffect(() => {
    setSearchName(influencerName);
    getSearchInfluencer();
  }, [influencerName]);

  const handleCardClick = (influencer) => {
    setSelectedInfluencer(influencer);
    console.log("Card clicked", influencer); // 콘솔 로그 추가
    setIsModalOpen(true);
  };

  const getSearchInfluencer = async () => {
    const { data } = await axios.post(`${URL}/influencers/search`, {
      name: influencerName,
    });
    setInfluencerList(data);
    return data;
  };

  const searchList = useQuery("searchList", getSearchInfluencer);

  return (
    <>
      <div className="w-screen h-screen pt-28 flex flex-col justify-start items-center">
        <section className="w-full">
          <ul className="px-24 flex flex-wrap justify-start items-start">
            {!searchList.isLoading &&
              influencerList.map((influencer, idx) => (
                <InfluencerCard
                  key={idx}
                  id={influencer.influencerId}
                  name={influencer.influencerName}
                  img={influencer.influencerImg}
                  gold={influencer.nowGold}
                  onClick={() => handleCardClick(influencer)}
                />
              ))}
            {!searchList.isLoading && influencerList.length === 0 && (
              <>
                <a>{SEARCH_DATA_NONE_TEXT}</a>
              </>
            )}
            {searchList.isLoading && <LoadingSnipper />}
          </ul>
        </section>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        influencer={selectedInfluencer}
        img={selectedInfluencer ? selectedInfluencer.influencerImg : null}
        id={selectedInfluencer ? selectedInfluencer.id : null}
        name={selectedInfluencer ? selectedInfluencer.influencerName : null}
      />
    </>
  );
};

export default SearchPage;
