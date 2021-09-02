import { useSelector } from "react-redux";
import styles from "./Admin.css";
import { BoardReact } from "../Board/Board";
import { OptionsReact } from "./OptionsReact/OptionsReact";
import { InGameReact } from "./InGameReact/InGameReact";
import { EndGameReact } from "./EndGameReact/EndGameReact";

export function Admin() {
  const status = useSelector((state) => state.chess.status);

  const optionsOrGame = () => {
    switch (status) {
      case "pause":
        return <OptionsReact />;
      case "play":
        return <InGameReact />;
      case "mated":
        return <EndGameReact />;
      case "saved":
        return <EndGameReact />;
      default:
        return <OptionsReact />;
    }
  };

  return (
    <div className="Admin">
      <div className="adminBoard">
        <BoardReact />
        {optionsOrGame()}
      </div>
    </div>
  );
}
