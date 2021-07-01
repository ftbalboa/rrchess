import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPiece } from "../../redux/actions/gameActions";
import "./Items.css";

//Images
import posMove from "../../img/posMove.png";


const imgDicc = {
  posMove: posMove,
};

export function ItemReact({ pos, click, posFun }) {
  const style = {
    backgroundColor: "transparent",
    gridColumn: posFun(pos,'column'),
    gridRow: posFun(pos,'row'),
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "all",
  };
  const img = imgDicc.posMove;
  const handleClick = () => {
    click(pos);
  };

  return (
    <div style={style}>
        <img
          alt="move"
          className="posMove"
          src={img}
          onClick={() => handleClick()}
        ></img>
    </div>
  );
}
