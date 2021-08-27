import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { setStatus, setId } from "../../../redux/actions/gameActions";
import styles from "./InGameReact.css";
import { ShowMovs } from "./ShowMovs/ShowMovs";
import axios from "axios";

export function InGameReact() {
  const dispatch = useDispatch();
  const playerName = useSelector((state) => state.chess.name);
  const gameId = useSelector((state) => state.chess.id);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    axios({
      method: "get",
      url: "http://localhost:3001/id",
    }).then(function (response) {
      dispatch(setId(response.data.id));
    });
  };

  return (
    <div className="IR">
      <div style = {{height:"30%"}}>
        <p style = {{marginTop:"40px"}}>{`${playerName} vs Computer`}</p>
      </div>
      <div style = {{height:"60%"}}>
        <ShowMovs needReset={true} />
      </div>
      <button
        className={"mainButton"}
        onClick={() => {
          dispatch(setStatus("mated"));
        }}
      >
        Rendirse
      </button>
    </div>
  );
}
