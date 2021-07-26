//Implement and handle Stockfish
import { store } from "../redux/store/store.js"; // for import dif

class Oponent {
  constructor() {
    this.stockfish = new Worker("stockfish.js");
    this.stockfish.onmessage = (event) => {
      let msg = event.data;
      //console.log(msg);
      if (msg.search("bestmove") !== -1 && msg !== this.evadeRepeat) {
        this.newMsg(msg.slice(9, 13));
        this.cb();
      }
      this.evadeRepeat = msg;
    };
    this.evadeRepeat = false;
    this.isMsg = false;
    this.move = "";
    this.cb = () => {};
  }
  chargeCb(cb) {
    this.cb = () => {
      cb();
    };
  }
  readMsg() {
    let forReturn = this.move;
    [this.isMsg, this.move] = [false, ""];
    return forReturn;
  }
  newMsg(m) {
    this.move = m;
    this.isMsg = true;
  }
  reqMove(moves) {
    //console.log(moves);
    let msg = `position startpos moves ${moves}`;
    let dif = store.getState().chess.dif;
    this.stockfish.postMessage(msg);
    switch (dif) {
      case "Easy":
        this.stockfish.postMessage(`go movetime 0 depth 1 nodes 1`);
        break;
      case "Medium":
        this.stockfish.postMessage(`go movetime 50 depth 3 nodes 400`);
        break;
      case "Hard":
        this.stockfish.postMessage(`go movetime 200 depth 15 nodes 5000`);
        break;
      default:
        this.stockfish.postMessage(`go movetime 0 depth 1 nodes 1`);
        break;
    }
    this.stockfish.postMessage(
      `go movetime ${dif * 10} depth ${dif * 5} nodes ${dif * 20}`
    );
  }
}

export default Oponent;
