
let id = 0;

class Piece {
  constructor(name, color, pos) {
    // position in (row col)
    id++;
    this.id = id-1;
    this.name = name;
    this.color = color;
    this.pos = pos;
    this.if_select = false;
    this.label = "";
    this.never_move = true;
  }

  //SETTERS

  set_position(position) {
    this.position = position;
    this.never_move = false;
  }

  set_select(select) {
    this.if_select = select;
  }

  set_label(label) {
    this.label = label;
  }

  set_label(label) {
    this.label = label;
  }

  set_if_select(select) {
    this.if_select = select;
  }

  set_never_move(never_move) {
    this.never_move = never_move;
  }

  //GETTERS

  get_name_color() {
    //Console prints piece name and color
    return `${this.name} ${this.color}`;
  }

  get_pos() {
    return this.pos;
  }

  get_label() {
    return this.label;
  }

  get_if_select() {
    return this.if_select;
  }

  get_color() {
    return this.color;
  }

  get_name() {
    return this.name;
  }

  get_never_move() {
    return this.never_move;
  }
}

export default Piece;