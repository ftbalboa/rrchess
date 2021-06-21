import Board from "./board.js";
import MovesManager from "./movesManager.js";
export default GameManager;


class GameManager{
constructor(){
        this.board = new Board();
        this.selected = False;
        this.turn = board.get_colors()[0];
        this.movs = [];
        this.piece_selected = ""
}

is_check(){
    //pass
}

possible_movs(piece, mov_or_threat){
    //pass
}

select_piece(){
    //pass
}

// deselect_all(){
//         this.gui.hide_label(this.select_item.get_label())
//         for piece in this.board.get_pieces():
//             piece.set_if_select(False)
//         for mov in this.movs:
//             this.gui.hide_label(mov.get_label())
//         this.movs = []
//         this.piece_selected = ""}

}