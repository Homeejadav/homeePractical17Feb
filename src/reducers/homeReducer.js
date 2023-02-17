import { reducerType } from '@constants';

var initialState = {
	data: [],
}

export default function reducer(state = initialState, action) {
	switch (action.type) {

		case reducerType.init:
			return { ...state, init: action.data }

		default:
			return { ...state }
	}
}