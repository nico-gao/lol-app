import React, { useContext, useState } from "react";
import Card from "../../components/Card/Card";
import ChampionRoleSelector from "../../components/ChampionRoleSelector/ChampionRoleSelector";
import ChampionContext from "../../store/champion-context";

import "./Champions.css";

const Champions = () => {
  const { champions, championRoles, error, loading } =
    useContext(ChampionContext);

  const [roleToggled, setRoleToggled] = useState(null);

  const roleChangeHandler = (role) => {
    setRoleToggled(role);
  };

  if (error) {
    return <h2>{error}</h2>;
  }

  if (loading) {
    return <h2 className="p__info">Loading...</h2>;
  }

  return (
    <div className="champions">
      <div className="champions__nav">
        <ChampionRoleSelector roleChangeHandler={roleChangeHandler} />
      </div>
      <div className="champions__wrapper">
        {roleToggled
          ? champions
              ?.filter((champion) =>
                championRoles[champion.id].includes(roleToggled) ? true : false
              )
              .map((champion) => (
                <Card data={champion} key={champion.id}>
                  <p className="p__info">{champion.name}</p>
                </Card>
              ))
          : champions?.map((champion) => (
              <Card data={champion} key={champion.id}>
                <p className="p__info">{champion.name}</p>
              </Card>
            ))}
      </div>
    </div>
  );
};

export default Champions;
