import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../..";
import { setMoves, setMovesDb } from "../../redux/actions/gameActions";
import { ShowMovs } from "../Admin/InGameReact/ShowMovs/ShowMovs";
import styles from "./Detail.css";
const axios = require("axios");

export function Detail({ gameId }) {
  const dispatch = useDispatch();
  const [gameData, setGameData] = useState(null);
  useEffect(()=>{
    axios({
      method: "GET",
      url: `${API}/game`,
      params: { idGame: gameId},
    }).then((res) => {
      setGameData(res.data);
    });
  },[])
  useEffect(()=>{
    if(gameData) dispatch(setMovesDb([...gameData.movs]))
  },[gameData])
  return (
    
    <div className="detailBox">
    {gameData?
      <div className="detailGame">
      <h4 className="detailTitle">{gameData.date.toString().substring(0,10)}</h4>
        <div className="namesDetailContainer">
          <div className="playerDetailContainer">
            {gameData.playerColor === "white"
              ? gameData.playerName
              : "Computer"}
            <div style={{
            backgroundColor: "white",
            borderRadius: "100%",
            height: "50px",
            width: "50px",
            marginTop:"5px",
          }}></div>
          </div>
          vs
          <div className="playerDetailContainer">
            {gameData.playerColor === "black"
              ? gameData.playerName
              : "Computer"}
            <div style={{
              marginTop:"5px",
            backgroundColor: "black",
            borderRadius: "100%",
            height: "50px",
            width: "50px",
          }}></div>
          </div>
        </div>
        <div className="inGameMovs">
        <ShowMovs db={true} />
        </div>
        <div className="detailTitle">
        {`${gameData.playerColor === gameData.win? gameData.playerName : 'Computer'} won`}
        </div>
      </div>
      : null }
    </div>
  );
}
