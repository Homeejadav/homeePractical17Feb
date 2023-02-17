import { reducerType } from '@constants';

var initialState = {
    quantity: 0,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case reducerType.quantity:
            return { ...state, quantity: action.data }

        default:
            return { ...state }
    }
}