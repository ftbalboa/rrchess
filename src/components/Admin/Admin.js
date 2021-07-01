import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBoard } from "../../redux/actions/gameActions";
import styles from "./Admin.css";

import { BoardReact } from "../Board/Board";
import { OptionsReact } from "./OptionsReact/OptionsReact";

export function Admin() {

  return (
    <div className="Admin">
        <div className="adminBoard">
        <BoardReact  />
        <OptionsReact />
        </div>
    </div>
  );
}
