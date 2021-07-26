import { useSelector, useDispatch } from "react-redux";
import { setStatus } from "../../../redux/actions/gameActions";
import styles from "./InGameReact.css";
import { ShowMovs } from "./ShowMovs/ShowMovs";

export function InGameReact() {
  const dispatch = useDispatch();
  const playerName = useSelector((state) => state.chess.name);
  const gameStatus = useSelector((state) => state.chess.status);

  return (
    <div className="OR">
        <p>{`${playerName} vs Computer`}</p>
        <p> Server ID: 0</p>
        <ShowMovs needReset = {true}/>
        <button onClick ={()=>{dispatch(setStatus('mated'))}}>
          Rendirse
        </button>
    </div>
  );
}
