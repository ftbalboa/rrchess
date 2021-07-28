import { useSelector, useDispatch} from "react-redux";
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
    <div className="OR">
      <p>{`${playerName} vs Computer`}</p>
      <p>{`Game ID: ${gameId}`}</p>
      <ShowMovs needReset={true} />
      <button
        onClick={() => {
          dispatch(setStatus("mated"));
        }}
      >
        Rendirse
      </button>
    </div>
  );
}
