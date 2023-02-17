import { reducerType } from '@constants';

var initialState = {
    cartData: [],
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case reducerType.cartData:
            return { ...state, cartData: action.data }

        default:
            return { ...state }
    }
}