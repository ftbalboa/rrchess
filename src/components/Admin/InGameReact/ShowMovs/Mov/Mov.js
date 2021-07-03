import React, { useEffect, useState } from "react";
import styles from "./Mov.css";

export function Mov({name}) {
  return (
    <div className="textMov">
        <p>{`${name}`}</p>
    </div>
  );
}