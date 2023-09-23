import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "react-query";
import { fetchAdsList, joinAd } from "../../api/advertisement";
import ChatWindow from "../ChatWindow/chatwindow";

function Modal({ isOpen, onClose, img, id, name }) {
  const [userIP, setUserIP] = useState(null);
  const [userNetworkType, setUserNetworkType] = useState(null);
  const [isAdClickable, setIsAdClickable] = useState(false);
  const uid = localStorage.getItem("username");
  // Mapping ads_type values to corresponding names
  const getTypeName = (type) => {
    switch (type) {
      case "1":
        return "설치형";
      case "2":
        return "실행형";
      case "3":
        return "참여형";
      case "4":
        return "클릭형";
      case "5":
        return "페이스북";
      case "6":
        return "트위터";
      case "7":
        return "인스타그램";
      case "8":
        return "노출형";
      case "10":
        return "유튜브 구독";
      case "11":
        return "네이버카페 가입";
      case "12":
        return "상품 구매형";
      default:
        return "Unknown";
    }
  };

  const { data, error, isLoading } = useQuery("adsList", fetchAdsList);
  const mutation = useMutation(joinAd);

  const handleAdClick = async (adId) => {
    if (isAdClickable) {
      try {
        const response = await mutation.mutateAsync({
          adId,
          userIP,
          userNetworkType,
          uid,
          id,
        });
        if (response.status === "S") {
          window.location.href = response.url;
        } else {
          console.error("Failed to join the ad");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.error("User details not yet loaded or unavailable");
    }
  };
  useEffect(() => {
    fetch("https://jsonip.com")
      .then((response) => response.json())
      .then((data) => {
        setUserIP(data.ip);
        console.log("User IP:", data.ip);

        if (navigator.connection) {
          setUserNetworkType(navigator.connection.effectiveType);
          console.log("Network Type:", navigator.connection.effectiveType);
        }

        if (
          data.ip &&
          navigator.connection &&
          navigator.connection.effectiveType
        ) {
          setIsAdClickable(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching IP: ", error);
      });
  }, []);

  if (!isOpen) return null;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-10">
        <div className="bg-white p-6 rounded shadow-lg w-4/5 h-4/5 relative overflow-y-auto">
          <div className="flex mb-10 justify-center items-center">
            {/* items-center를 추가 */}
            <div className="flex" style={{ width: "desired-width" }}>
              {img && (
                <div
                  className="relative"
                  style={{ width: "512px", height: "512px" }}
                >
                  <span className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-lg px-2 rounded">
                    {name}
                  </span>
                  <img
                    src={img}
                    alt="Influencer"
                    style={{ width: "100%", height: "100%" }} // Adjusted to fit the container
                  />
                </div>
              )}
              <div className="flex" style={{ width: "380px" }}>
                <ChatWindow id={id} />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-2">
            {data.list_data.map((ad) => (
              <div
                key={ad.ads_idx}
                className={`w-1/3 px-2 mb-4 ${
                  isAdClickable ? "" : "cursor-not-allowed opacity-50"
                }`}
                onClick={() => handleAdClick(ad.ads_idx)}
              >
                <div className="flex border rounded shadow p-2 h-full">
                  <img
                    src={ad.ads_icon_img}
                    alt={ad.ads_name}
                    className="w-20 h-20 self-center mr-2"
                  />
                  <div className="flex flex-col justify-around">
                    <p className="text-gray-500">{getTypeName(ad.ads_type)}</p>
                    <p>
                      {ad.ads_name.length > 25
                        ? `${ad.ads_name.slice(0, 25)}...`
                        : ad.ads_name}
                    </p>
                    <p className="text-red-500">+{ad.ads_reward_price}골드</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-red-700 text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-600 z-20"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
      </div>
    </>
  );
}

export default Modal;
