import { SET_STATUS, SET_COLOR, ADD_MOVE, SET_MODE, SET_TURN, RESET_MOVES, SET_NAME, SET_DIF, SET_ID, SET_GAMES_LIST, SET_MOVES, SET_WAIT } from "../constants";

export function setTurn(status) {
  return {
    type: SET_TURN,
    payload: status,
  };
}

export function setGameList(status) {
  return {
    type: SET_GAMES_LIST,
    payload: status,
  };
}

export function setId(status) {
  return {
    type: SET_ID,
    payload: status,
  };
}

export function setName(status) {
  return {
    type: SET_NAME,
    payload: status,
  };
}

export function setDif(status) {
  return {
    type: SET_DIF,
    payload: status,
  };
}

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status,
  };
}

export function resetMoves() {
  return {
    type: RESET_MOVES,
  };
}

export function setMode(mode) {
  return {
    type: SET_MODE,
    payload: mode,
  };
}

export function setColor(color) {
  return {
    type: SET_COLOR,
    payload: color,
  };
}

export function addMove(movType, pieceName = "", initPos = [], pos = [], ambPos = []) {
  return {
    type: ADD_MOVE,
    payload: {
      movType: movType,
      pieceName: pieceName,
      initPos: initPos,
      pos: pos,
      ambPos: ambPos
    },
  };
}

export function setMoves(moves) {
  return {
    type: SET_MOVES,
    payload: moves,
  };
}

export function setWait(wait) {
  return {
    type: SET_WAIT, payload:wait
  };
}