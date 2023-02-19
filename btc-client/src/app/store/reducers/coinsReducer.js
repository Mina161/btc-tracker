import { COINS, COINS_SUCCESS, COINS_FAIL } from "../actions/types";

const initialState = {
    data: [],
    isLoading: false,
    isError: false,
};

export default function store(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case COINS:
            return {
                ...state,
                isLoading: true,
            };
        case COINS_SUCCESS:
            return {
                ...state,
                data: payload,
                isLoading: false,
                isError: false,
            };
        case COINS_FAIL:
            return {
                ...state,
                data: [],
                isLoading: false,
                isError: true,
            };
        default:
            return state;
    }
}