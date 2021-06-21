import { SELECT_PIECE, SET_BOARD } from '../constants';

export function selectPiece(id) {
	return {
		type: SELECT_PIECE,
		payload: id,
	};
}

export function setBoard(board) {
	return {
		type: SET_BOARD,
		payload: board,
	};
}