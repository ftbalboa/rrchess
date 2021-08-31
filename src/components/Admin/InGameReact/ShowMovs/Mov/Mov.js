import React, { useEffect, useState } from "react";
import styles from "./Mov.css";

export function Mov({movs, index}) {
  const style = {
    display:"flex",
    width: "100%",
    "backgroundColor":`${index % 2 === 0? "DarkGrey" : "grey"}`,
    "height": "25px",
    "alignItems":"center"
  }
  return (
    <div style = {style}>
        <div className = "numBox">{`${index}.`}</div>
        <div className = "movBox" >{`${movs[0]}`}</div>
        <div className = "movBox" >{`${movs.length > 1 ? movs[1] : ""}`}</div>
    </div>
  );
}