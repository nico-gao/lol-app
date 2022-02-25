import React, { useEffect, useState } from "react";

import images from "../../constants/images";

import "./SkinDetail.css";

const SkinDetail = ({ data }) => {
  const [rarityIcon, setRarityIcon] = useState(null);

  useEffect(() => {
    switch (data.rarity) {
      case "Epic":
        setRarityIcon(images.epic);
        break;
      case "Legendary":
        setRarityIcon(images.legendary);
        break;
      case "Mythic":
        setRarityIcon(images.mythic);
        break;
      case "Ultimate":
        setRarityIcon(images.ultimate);
        break;
      default:
        setRarityIcon(false);
    }
  }, [data.rarity]);

  return (
    <div className="skin__detail">
      <div className="skin__detail-info">
        {rarityIcon && <img src={rarityIcon} alt="rarity" />}
        <p>{data.name}</p>
        {data.name !== "Original" && <p>{data.cost}</p>}
      </div>
      <div className="skin__detail-release__date">{data.release}</div>
    </div>
  );
};

export default SkinDetail;
