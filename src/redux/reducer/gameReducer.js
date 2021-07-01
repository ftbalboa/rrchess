import { SET_STATUS, SET_COLOR } from '../constants';


const initialState = {
	playerColor: 'white',
	status: null,
};


export const gameReducer = (state = initialState, action) => {
	switch (action.type) {

		case SET_STATUS:
			return {...state, status:action.payload};
		
		case SET_COLOR:
			return {...state, playerColor:action.payload};

		default:
			return state;
	}
};