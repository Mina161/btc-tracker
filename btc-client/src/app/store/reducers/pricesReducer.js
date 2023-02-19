import { PRICES, PRICES_SUCCESS, PRICES_FAIL } from "../actions/types";

const initialState = {
    data: null,
    isLoading: false,
    isError: false,
};

export default function store(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case PRICES:
            return {
                ...state,
                isLoading: true,
            };
        case PRICES_SUCCESS:
            return {
                ...state,
                data: payload,
                isLoading: false,
                isError: false,
            };
        case PRICES_FAIL:
            return {
                ...state,
                data: null,
                isLoading: false,
                isError: true,
            };
        default:
            return state;
    }
}