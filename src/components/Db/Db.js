import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SearchBar } from "./SearchBar/SeacrhBar";
import "./Db.css";
import { GameCard } from "./GameCard/GameCard";

import bkg1 from "../../assets/db/1.jpg";
import bkg2 from "../../assets/db/2.jpg";
import bkg3 from "../../assets/db/3.jpg";
import bkg4 from "../../assets/db/4.jpg";
import bkg5 from "../../assets/db/5.jpg";
import bkg6 from "../../assets/db/6.jpg";
import bkg7 from "../../assets/db/7.jpg";
import bkg8 from "../../assets/db/8.jpg";
import bkg9 from "../../assets/db/9.jpg";
import bkg10 from "../../assets/db/10.jpg";

const bkgArr = [bkg1, bkg2, bkg3, bkg4, bkg5, bkg6, bkg7, bkg8, bkg9, bkg10];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function Db() {
  const games = useSelector((state) => state.chess.gameList);
  const nPage = 10;
  const [page, setPage] = useState(0);
  const [imgArr, setImgArr] = useState([...bkgArr]);
  useEffect(() => {
    let arrForAct = [];
    let actArr = [...bkgArr];
    while (arrForAct.length !== games.length) {
      if (actArr.length === 0) {
        actArr = [...bkgArr];
      }
      arrForAct.push(actArr.splice(getRandomInt(0, actArr.length - 1), 1)[0]);
    }
    setImgArr([...arrForAct]);
  }, [games]);

  const paginado = () => {
    if(games.length > 0){
    return (
      <div className="paginado">
        <div className = {page > 0 ?  "pageItem" : "pageItemHidden"} onClick={()=>{setPage(page-1)}} > {'<'} </div>
        <div className="pageNumber">{page + 1}</div>
        <div className = {page + 1 < games.length / 10 ?  "pageItem" : "pageItemHidden"} onClick={()=>{setPage(page+1)}}> { ">" }</div>
      </div>
    );}
  };

  return (
    <div className="Db">
      <SearchBar buttonName="Search by name" path="games" query="name" />
      {games.length === imgArr.length ? (
        <div className={"cardsContainer"}>
          {games.map((g, index) =>
            index < page * 10 + 10 && index > page * 10 - 1 ? (
              <GameCard game={g} key={index} img={imgArr[index]} />
            ) : null
          )}
        </div>
      ) : null}
      <div>{paginado()}</div>
    </div>
  );
}

export default Db;
