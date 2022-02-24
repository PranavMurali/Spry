export const initialState = {
    admin : false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_ADMIN':
            return {
                ...state,
                admin: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;