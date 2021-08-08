import { useSelector } from "react-redux";
import styles from "./Admin.css";
import { BoardReact } from "../Board/Board";
import { OptionsReact } from "./OptionsReact/OptionsReact";
import { InGameReact } from "./InGameReact/InGameReact";
import { EndGameReact } from "./EndGameReact/EndGameReact";
import { Container, Row, Col } from "react-bootstrap";

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
    }
  };

  return (
    <Container className="adminBoard">
      <Row>
        <Col md="auto"><BoardReact /></Col>
        <Col md="auto">{optionsOrGame()}</Col>
      </Row>
    </Container>
  );
}
