import { SET_STATUS, SET_COLOR, ADD_MOVE, TEST } from "../constants";

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status,
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
