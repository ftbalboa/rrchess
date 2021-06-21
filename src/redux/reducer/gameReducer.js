import GameManager from '../../logic/movesManager';
import { SELECT_PIECE, SET_BOARD } from '../constants';


const initialState = {
	board: {},
	pieces: [], 
};


export const gameReducer = (state = initialState, action) => {
	switch (action.type) {

		case SET_BOARD:
			return state;
			
		case SELECT_PIECE:
            let index = state.pieces.findIndex(e => e.id === action.payload);
			console.log(index);
			console.log(action.payload);
            state.pieces[index].if_select = !state.pieces[index].if_select
			return {
				...state,
			};

		default:
			return state;
	}
};