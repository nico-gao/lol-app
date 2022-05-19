import React, { useState } from "react";

import { top, jungle, middle, bottom, utility } from "../../constants/images";
import "./ChampionRoleSelector.css";

const ChampionRoleSelector = ({ roleChangeHandler }) => {
  const [roleToggled, setRoleToggled] = useState(null);

  const changeHandler = (e) => {
    const role = e.target.value;
    if (roleToggled === role) {
      setRoleToggled(() => {
        roleChangeHandler(null);
        return null;
      });
    } else {
      setRoleToggled(() => {
        roleChangeHandler(role);
        return role;
      });
    }
  };

  return (
    <div className="role-selector">
      <label id="TOP" className={`${roleToggled === "TOP" ? "selected" : ""}`}>
        <input
          type="checkbox"
          name="TOP"
          value="TOP"
          checked={roleToggled === "TOP"}
          onChange={changeHandler}
        />
        <img src={top} alt="top" />
      </label>
      <label id="JUNGLE" className={`${roleToggled === "JUNGLE" ? "selected" : ""}`}>
        <input
          type="checkbox"
          name="JUNGLE"
          value="JUNGLE"
          checked={roleToggled === "JUNGLE"}
          onChange={changeHandler}
        />
        <img src={jungle} alt="jungle" />
      </label>
      <label id="MIDDLE" className={`${roleToggled === "MIDDLE" ? "selected" : ""}`}>
        <input
          type="checkbox"
          name="MIDDLE"
          value="MIDDLE"
          checked={roleToggled === "MIDDLE"}
          onChange={changeHandler}
        />
        <img src={middle} alt="middle" />
      </label>
      <label id="BOTTOM" className={`${roleToggled === "BOTTOM" ? "selected" : ""}`}>
        <input
          type="checkbox"
          name="BOTTOM"
          value="BOTTOM"
          checked={roleToggled === "BOTTOM"}
          onChange={changeHandler}
        />
        <img src={bottom} alt="bottom" />
      </label>
      <label id="UTILITY" className={`${roleToggled === "UTILITY" ? "selected" : ""}`}>
        <input
          type="checkbox"
          name="UTILITY"
          value="UTILITY"
          checked={roleToggled === "UTILITY"}
          onChange={changeHandler}
        />
        <img src={utility} alt="utility" />
      </label>
    </div>
  );
};

export default ChampionRoleSelector;
