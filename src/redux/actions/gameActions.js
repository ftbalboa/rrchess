import { SET_STATUS, SET_COLOR, ADD_MOVE, TEST, SET_MODE, SET_TURN } from "../constants";

export function setTurn(status) {
  return {
    type: SET_TURN,
    payload: status,
  };
}

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status,
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

export function test(payload) {
  return {
    type: TEST,
    payload: payload,
  };
}
