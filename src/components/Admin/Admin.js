import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBoard } from "../../redux/actions/gameActions";
import styles from "./Admin.css";

import { BoardReact } from "../Board/Board";
import { OptionsReact } from "./OptionsReact/OptionsReact";
import { InGameReact } from "./InGameReact/InGameReact";

export function Admin() {

  const status = useSelector((state) => state.chess.status);

  const optionsOrGame = ()=>{
    if( status === 'play')
    {return (<InGameReact />)}
    else {return (<OptionsReact />)}
  }

  return (
    <div className="Admin">
        <div className="adminBoard">
        <BoardReact  />
        {optionsOrGame()}
        </div>
    </div>
  );
}
