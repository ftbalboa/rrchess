import {SET_STATUS, SET_COLOR } from '../constants';

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