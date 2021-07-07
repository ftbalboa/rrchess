//Implement and handle Stockfish

class Oponent{
    constructor(){
        this.stockfish = new Worker("stockfish.js");
        this.stockfish.onmessage = (event) => {
            let msg = event.data;
            //console.log(msg);
            if(msg.search("bestmove") !== -1 && msg !== this.evadeRepeat) {
                this.newMsg(msg.slice(9,13));
                this.cb();
            }
            this.evadeRepeat = msg;
        };
        this.evadeRepeat = false;
        this.isMsg = false;
        this.move = "";
        this.cb = ()=>{}
    }
    chargeCb(cb){
        this.cb = ()=>{cb()};
    }
    readMsg(){
        let forReturn = this.move;
        [this.isMsg, this.move] = [false, ""]
        return forReturn
    }
    newMsg(m){
        this.move = m;
        this.isMsg = true;
    }
    reqMove(moves){
        let msg = `position startpos moves ${moves}`
        this.stockfish.postMessage(msg);
        this.stockfish.postMessage("go depth 3");
    }
}

export default Oponent;