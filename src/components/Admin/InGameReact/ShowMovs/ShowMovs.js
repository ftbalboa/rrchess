import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetMoves } from "../../../../redux/actions/gameActions";
import styles from "./ShowMovs.css";
import { Mov } from "./Mov/Mov";

export function ShowMovs({db}) {
  const dispatch = useDispatch();

  const ajustArray = (a) => {
    let fr = [];
    a.forEach((mov) => {
      if (fr.length === 0 || fr[fr.length - 1].length > 1) fr.push([]);
      fr[fr.length - 1].push(mov);
    });
    return fr
  };

  const arrMovsDb = useSelector((state) => ajustArray(state.chess.movesDb));
  const arrMovs = useSelector((state) => ajustArray(state.chess.moves));
  const show = db? arrMovsDb : arrMovs;

  return (
    <div>
      <p> Movs </p>
      <div className="movs">
        {show.map((mov, index) => (
          <Mov movs={mov} key={index} index={index+1} />
        ))}
      </div>
    </div>
  );
}
