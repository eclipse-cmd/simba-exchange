export const actionCreator = {
    SET_USER: "SET_USER",
    SET_USERS: "SET_USERS",
    REMOVE_USER: "REMOVE_USER",
    SET_TOKEN: "SET_TOKEN",
    REMOVE_TOKEN: "REMOVE_TOKEN",
    SET_WALLET: "SET_WALLET",
    REMOVE_WALLET: "REMOVE_WALLET"
};

const reducer = (state: any, action: { type: string, payload?: object | string; }) => {
    switch (action.type) {
        case actionCreator.SET_USER:
            return {
                ...state,
                auth: action.payload,
            };
        case actionCreator.SET_USERS:
            return {
                ...state,
                users: action.payload,
            };
        case actionCreator.REMOVE_USER:
            return {
                ...state,
                auth: null,
            };
        case actionCreator.SET_TOKEN:
            return {
                ...state,
                token: action.payload,
            };
        case actionCreator.REMOVE_TOKEN:
            return {
                ...state,
                token: null,
            };
        case actionCreator.SET_WALLET:
            return {
                ...state,
                wallet: action.payload,
            };
        case actionCreator.REMOVE_WALLET:
            return {
                ...state,
                wallet: null,
            };
        default:
            return state;
    }
};

export default reducer;