//Implement and handle Stockfish
var stockfish = new Worker("stockfish.js");
stockfish.onmessage = function onmessage(event) {
    console.log(event.data);
};
stockfish.postMessage("go depth 15");


class Oponent{
    constructor(){
    }
}