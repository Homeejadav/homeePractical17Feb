import { reducerType } from '@constants';

var initialState = {
    favoriteData: [],
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case reducerType.favoriteData:
            return { ...state, favoriteData: action.data }

        default:
            return { ...state }
    }
}